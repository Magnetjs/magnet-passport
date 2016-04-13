'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _base = require('magnet-core/dist/base');

var _base2 = _interopRequireDefault(_base);

var _passport = require('./config/passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Passport = function (_Base) {
  _inherits(Passport, _Base);

  function Passport() {
    _classCallCheck(this, Passport);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Passport).apply(this, arguments));
  }

  _createClass(Passport, [{
    key: 'setup',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var config, _arr, _loop, _i;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                config = Object.assign(_passport2.default, this.config.passport);


                this.loadStrategies(config);

                // Setup user serialize and deserialize in generator style
                _arr = ['serializeUser', 'deserializeUser'];

                _loop = function _loop() {
                  var type = _arr[_i];
                  _koaPassport2.default[type](function () {
                    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user, next) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              _context.next = 3;
                              return config[type](user);

                            case 3:
                              _context.t0 = _context.sent;
                              next(null, _context.t0);
                              _context.next = 11;
                              break;

                            case 7:
                              _context.prev = 7;
                              _context.t1 = _context['catch'](0);

                              this.log.error(_context.t1);
                              next(_context.t1);

                            case 11:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee, this, [[0, 7]]);
                    }));

                    return function (_x, _x2) {
                      return ref.apply(this, arguments);
                    };
                  }());
                };

                for (_i = 0; _i < _arr.length; _i++) {
                  _loop();
                }

                // Integrate with Koajs
                this.app.application.use(_koaPassport2.default.initialize());
                this.app.application.use(_koaPassport2.default.session());
                this.app.passport = _koaPassport2.default;

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setup() {
        return ref.apply(this, arguments);
      }

      return setup;
    }()

    /**
     * Setup strategy from user config
     */

  }, {
    key: 'loadStrategies',
    value: function loadStrategies(config) {
      var ctx = this;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop2 = function _loop2() {
          var strategy = _step.value;

          var strategyParameters = [function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
              for (var _len = arguments.length, parameters = Array(_len), _key = 0; _key < _len; _key++) {
                parameters[_key] = arguments[_key];
              }

              var next;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      next = parameters.pop();
                      _context3.prev = 1;

                      parameters.unshift(ctx.app);
                      _context3.next = 5;
                      return strategy.check.apply(this, parameters);

                    case 5:
                      _context3.t0 = _context3.sent;
                      next(null, _context3.t0);
                      _context3.next = 13;
                      break;

                    case 9:
                      _context3.prev = 9;
                      _context3.t1 = _context3['catch'](1);

                      this.log.error(_context3.t1);
                      next(_context3.t1);

                    case 13:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, this, [[1, 9]]);
            }));

            return function (_x3) {
              return ref.apply(this, arguments);
            };
          }()];

          if (strategy.options) {
            strategyParameters.unshift(strategy.options);
          }

          _koaPassport2.default.use(new (Function.prototype.bind.apply(strategy.adapter, [null].concat(strategyParameters)))());
        };

        for (var _iterator = config.strategies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop2();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return Passport;
}(_base2.default);

exports.default = Passport;