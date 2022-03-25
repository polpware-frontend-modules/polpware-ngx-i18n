(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@polpware/ngx-i18n', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory((global.polpware = global.polpware || {}, global.polpware['ngx-i18n'] = {}), global.ng.core, global.rxjs, global.ng.common));
}(this, (function (exports, core, rxjs, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /* tslint:disable */
    /**
     * Determines if two objects or two values are equivalent.
     *
     * Two objects or values are considered equivalent if at least one of the following is true:
     *
     * * Both objects or values pass `===` comparison.
     * * Both objects or values are of the same type and all of their properties are equal by
     *   comparing them with `equals`.
     *
     * @param o1 Object or value to compare.
     * @param o2 Object or value to compare.
     * @returns true if arguments are equal.
     */
    function equals(o1, o2) {
        if (o1 === o2)
            return true;
        if (o1 === null || o2 === null)
            return false;
        if (o1 !== o1 && o2 !== o2)
            return true; // NaN === NaN
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 == t2 && t1 == 'object') {
            if (Array.isArray(o1)) {
                if (!Array.isArray(o2))
                    return false;
                if ((length = o1.length) == o2.length) {
                    for (key = 0; key < length; key++) {
                        if (!equals(o1[key], o2[key]))
                            return false;
                    }
                    return true;
                }
            }
            else {
                if (Array.isArray(o2)) {
                    return false;
                }
                keySet = Object.create(null);
                for (key in o1) {
                    if (!equals(o1[key], o2[key])) {
                        return false;
                    }
                    keySet[key] = true;
                }
                for (key in o2) {
                    if (!(key in keySet) && typeof o2[key] !== 'undefined') {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    /* tslint:enable */
    function isDefined(value) {
        return typeof value !== 'undefined' && value !== null;
    }
    function isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    function mergeDeep(target, source) {
        var output = Object.assign({}, target);
        if (isObject(target) && isObject(source)) {
            Object.keys(source).forEach(function (key) {
                var _a, _b;
                if (isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                    }
                    else {
                        output[key] = mergeDeep(target[key], source[key]);
                    }
                }
                else {
                    Object.assign(output, (_b = {}, _b[key] = source[key], _b));
                }
            });
        }
        return output;
    }
    /**
     * Replaces the parameters in the given string. A parameter is delimited by a
     * a pair of double braces. E.g., {{name}}
     * @param format The given string
     * @param params An object defining the values of the parameters in the string.
     */
    function replaceParams(format, params) {
        /*jslint unparam: true */
        return format.replace(/\{\{([a-zA-Z]+)\}\}/g, function (s, key) {
            return (typeof params[key] === 'undefined') ? '' : params[key];
        });
    }
    /**
     * Looks up the given key for its corresponding values
     * in the given resources.
     * @param resources Resources
     * @param key String
     * @param interpolateParams The values for the parameters.
     */
    function lookupDeeply(resources, key, interpolateParams) {
        // Get
        var ks = [];
        if (typeof key == 'string') {
            ks = key.split('.');
        }
        else {
            ks = key;
        }
        ks = ks.filter(function (a) { return a; });
        var res = resources;
        for (var i = 0; i < ks.length; i++) {
            var c = ks[i];
            if (res[c]) {
                res = res[c];
            }
            else {
                res = undefined;
                break;
            }
        }
        var s = undefined;
        if (res !== undefined && typeof res == 'string') {
            s = res;
            if (interpolateParams) {
                s = replaceParams(res, interpolateParams);
            }
        }
        var v = s !== undefined ? s : ks.join('.');
        return v;
    }

    /* On purpose we do not make it injectable.
       It is up to the host to define how to do this */
    var NgxTranslatorImplService = /** @class */ (function () {
        function NgxTranslatorImplService() {
            this._dict = {};
            this.onTranslationChange = new core.EventEmitter();
            this.onLangChange = new core.EventEmitter();
            this.onDefaultLangChange = new core.EventEmitter();
            this.defaultLang = '';
            this.currentLang = '';
            this.langs = [];
        }
        NgxTranslatorImplService.prototype.getParsedResult = function (translations, key, interpolateParams) {
            return key;
        };
        NgxTranslatorImplService.prototype.get = function (key, interpolateParams) {
            var v = lookupDeeply(this._dict, key, interpolateParams);
            return rxjs.of(v);
        };
        NgxTranslatorImplService.prototype.loadResources = function (resources) {
            // todo: A better implementation
            Object.assign(this._dict, resources);
        };
        return NgxTranslatorImplService;
    }());

    var HyperTranslatePipeBase = /** @class */ (function () {
        function HyperTranslatePipeBase() {
            this.value = '';
            this.lastKey = null;
            this.lastParams = [];
        }
        HyperTranslatePipeBase.prototype.updateValue = function (key, interpolateParams, translations) {
            var _this = this;
            var onTranslation = function (res) {
                _this.value = res !== undefined ? res : key;
                _this.lastKey = key;
                _this._ref.markForCheck();
            };
            if (translations) {
                var res = this._translate.getParsedResult(translations, key, interpolateParams);
                if (rxjs.isObservable(res.subscribe)) {
                    res.subscribe(onTranslation);
                }
                else {
                    onTranslation(res);
                }
            }
            this._translate.get(key, interpolateParams).subscribe(onTranslation);
        };
        HyperTranslatePipeBase.prototype.transform = function (query) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!query || !query.length) {
                return query;
            }
            // if we ask another time for the same key, return the last value
            if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
                return this.value;
            }
            var interpolateParams = undefined;
            if (isDefined(args[0]) && args.length) {
                if (typeof args[0] === 'string' && args[0].length) {
                    // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                    // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                    var validArgs = args[0]
                        .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                        .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                    try {
                        interpolateParams = JSON.parse(validArgs);
                    }
                    catch (e) {
                        throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                    }
                }
                else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                    interpolateParams = args[0];
                }
            }
            // store the query, in case it changes
            this.lastKey = query;
            // store the params, in case they change
            this.lastParams = args;
            // set the value
            this.updateValue(query, interpolateParams);
            // if there is a subscription to onLangChange, clean it
            this._dispose();
            // subscribe to onTranslationChange event, in case the translations change
            if (!this.onTranslationChange) {
                this.onTranslationChange = this._translate.onTranslationChange.subscribe(function (event) {
                    if (_this.lastKey && event.lang === _this._translate.currentLang) {
                        _this.lastKey = null;
                        _this.updateValue(query, interpolateParams, event.translations);
                    }
                });
            }
            // subscribe to onLangChange event, in case the language changes
            if (!this.onLangChange) {
                this.onLangChange = this._translate.onLangChange.subscribe(function (event) {
                    if (_this.lastKey) {
                        _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                        _this.updateValue(query, interpolateParams, event.translations);
                    }
                });
            }
            // subscribe to onDefaultLangChange event, in case the default language changes
            if (!this.onDefaultLangChange) {
                this.onDefaultLangChange = this._translate.onDefaultLangChange.subscribe(function () {
                    if (_this.lastKey) {
                        _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                        _this.updateValue(query, interpolateParams);
                    }
                });
            }
            return this.value;
        };
        /**
         * Clean any existing subscription to change events
         */
        HyperTranslatePipeBase.prototype._dispose = function () {
            if (typeof this.onTranslationChange !== 'undefined') {
                this.onTranslationChange.unsubscribe();
                this.onTranslationChange = undefined;
            }
            if (typeof this.onLangChange !== 'undefined') {
                this.onLangChange.unsubscribe();
                this.onLangChange = undefined;
            }
            if (typeof this.onDefaultLangChange !== 'undefined') {
                this.onDefaultLangChange.unsubscribe();
                this.onDefaultLangChange = undefined;
            }
        };
        HyperTranslatePipeBase.prototype.ngOnDestroy = function () {
            this._dispose();
        };
        /** @nocollapse */ HyperTranslatePipeBase.ɵfac = function HyperTranslatePipeBase_Factory(t) { return new (t || HyperTranslatePipeBase)(); };
        /** @nocollapse */ HyperTranslatePipeBase.ɵdir = core.ɵɵdefineDirective({ type: HyperTranslatePipeBase });
        return HyperTranslatePipeBase;
    }());

    var HyperTranslatePipe = /** @class */ (function (_super) {
        __extends(HyperTranslatePipe, _super);
        function HyperTranslatePipe(_translate, _ref) {
            var _this = _super.call(this) || this;
            _this._translate = _translate;
            _this._ref = _ref;
            return _this;
        }
        /** @nocollapse */ HyperTranslatePipe.ɵfac = function HyperTranslatePipe_Factory(t) { return new (t || HyperTranslatePipe)(core.ɵɵdirectiveInject(NgxTranslatorImplService), core.ɵɵinjectPipeChangeDetectorRef()); };
        /** @nocollapse */ HyperTranslatePipe.ɵpipe = core.ɵɵdefinePipe({ name: "hyperTrans", type: HyperTranslatePipe, pure: false });
        /** @nocollapse */ HyperTranslatePipe.ɵprov = core.ɵɵdefineInjectable({ token: HyperTranslatePipe, factory: HyperTranslatePipe.ɵfac });
        return HyperTranslatePipe;
    }(HyperTranslatePipeBase));
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(HyperTranslatePipe, [{
            type: core.Injectable
        }, {
            type: core.Pipe,
            args: [{
                    name: 'hyperTrans',
                    pure: false // required to update the value when the promise is resolved
                }]
        }], function () { return [{ type: NgxTranslatorImplService }, { type: core.ChangeDetectorRef }]; }, null); })();

    var NgxI18nModule = /** @class */ (function () {
        function NgxI18nModule() {
        }
        /** @nocollapse */ NgxI18nModule.ɵmod = core.ɵɵdefineNgModule({ type: NgxI18nModule });
        /** @nocollapse */ NgxI18nModule.ɵinj = core.ɵɵdefineInjector({ factory: function NgxI18nModule_Factory(t) { return new (t || NgxI18nModule)(); }, imports: [[
                    common.CommonModule,
                ]] });
        return NgxI18nModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(NgxI18nModule, { declarations: [HyperTranslatePipe], imports: [common.CommonModule], exports: [HyperTranslatePipe] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(NgxI18nModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [HyperTranslatePipe],
                    imports: [
                        common.CommonModule,
                    ],
                    exports: [HyperTranslatePipe]
                }]
        }], null, null); })();

    exports.HyperTranslatePipe = HyperTranslatePipe;
    exports.HyperTranslatePipeBase = HyperTranslatePipeBase;
    exports.NgxI18nModule = NgxI18nModule;
    exports.NgxTranslatorImplService = NgxTranslatorImplService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polpware-ngx-i18n.umd.js.map
