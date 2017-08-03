import { Module } from 'magnet-core/module'
import * as passport from 'koa-passport'

export default class Passport extends Module {
  init () {
    this.moduleName = 'passport'
    this.defaultConfig = __dirname
  }

  async setup () {
    this.app.koa.use(passport.initialize())
    this.insert(passport)

    for (const strategy of this.config.strategies) {
      this.app.passport.use(strategy)
    }
  }
}
