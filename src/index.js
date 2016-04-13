import passport from 'koa-passport';
import Base from 'magnet-core/dist/base';
import defaultConfig from './config/passport';

export default class Passport extends Base {
  async setup() {
    const config = Object.assign(defaultConfig, this.config.passport);

    this.loadStrategies(config);

    // Setup user serialize and deserialize in generator style
    for (let type of ['serializeUser', 'deserializeUser']) {
      passport[type](async function(user, next) {
        try {
          next(null, await config[type](user));
        } catch (err) {
          this.log.error(err);
          next(err);
        }
      });
    }

    // Integrate with Koajs
    this.app.application.use(passport.initialize());
    this.app.application.use(passport.session());
    this.app.passport = passport;
  }

  /**
   * Setup strategy from user config
   */
  loadStrategies(config) {
    let ctx = this;
    for (let strategy of config.strategies) {
      let strategyParameters = [async function(...parameters) {
        const next = parameters.pop();
        try {
          parameters.unshift(ctx.app);
          next(null, await strategy.check.apply(this, parameters));
        } catch (err) {
          this.log.error(err);
          next(err);
        }
      }];

      if (strategy.options) {
        strategyParameters.unshift(strategy.options);
      }

      passport.use(
        new strategy.adapter(...strategyParameters)
      );
    }
  }
}
