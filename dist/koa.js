"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const passport = require("koa-passport");
class MagnetPassport extends module_1.Module {
    init() {
        this.moduleName = 'passport';
        this.defaultConfig = __dirname;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.koa.use(passport.initialize());
            this.insert(passport);
            for (const strategy of this.config.strategies) {
                if (strategy && strategy.key) {
                    this.app.passport.use(strategy.key, strategy.strategy);
                }
                else {
                    this.app.passport.use(strategy);
                }
            }
        });
    }
}
exports.default = MagnetPassport;
//# sourceMappingURL=koa.js.map