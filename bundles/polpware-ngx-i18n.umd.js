(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
   typeof define === 'function' && define.amd ? define('@polpware/ngx-i18n', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
   (global = global || self, factory((global.polpware = global.polpware || {}, global.polpware['ngx-i18n'] = {}), global.ng.core, global.rxjs, global.ng.common));
}(this, (function (exports, core, rxjs, common) { 'use strict';

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

   var HyperTranslatePipe = /** @class */ (function () {
       function HyperTranslatePipe(translate, _ref) {
           this.translate = translate;
           this._ref = _ref;
           this.value = '';
           this.lastKey = null;
           this.lastParams = [];
       }
       HyperTranslatePipe.prototype.updateValue = function (key, interpolateParams, translations) {
           var _this = this;
           var onTranslation = function (res) {
               _this.value = res !== undefined ? res : key;
               _this.lastKey = key;
               _this._ref.markForCheck();
           };
           if (translations) {
               var res = this.translate.getParsedResult(translations, key, interpolateParams);
               if (rxjs.isObservable(res.subscribe)) {
                   res.subscribe(onTranslation);
               }
               else {
                   onTranslation(res);
               }
           }
           this.translate.get(key, interpolateParams).subscribe(onTranslation);
       };
       HyperTranslatePipe.prototype.transform = function (query) {
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
               this.onTranslationChange = this.translate.onTranslationChange.subscribe(function (event) {
                   if (_this.lastKey && event.lang === _this.translate.currentLang) {
                       _this.lastKey = null;
                       _this.updateValue(query, interpolateParams, event.translations);
                   }
               });
           }
           // subscribe to onLangChange event, in case the language changes
           if (!this.onLangChange) {
               this.onLangChange = this.translate.onLangChange.subscribe(function (event) {
                   if (_this.lastKey) {
                       _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                       _this.updateValue(query, interpolateParams, event.translations);
                   }
               });
           }
           // subscribe to onDefaultLangChange event, in case the default language changes
           if (!this.onDefaultLangChange) {
               this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(function () {
                   if (_this.lastKey) {
                       _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                       _this.updateValue(query, interpolateParams);
                   }
               });
           }
           if (this.value == query) {
               if (args.length > 2 && isDefined(args[2]) && typeof args[2] === 'object') {
                   var defaultResources = args[2];
                   // Update it
                   var anotherTry = lookupDeeply(defaultResources, query, interpolateParams);
                   if (anotherTry) {
                       this.value = anotherTry;
                   }
               }
           }
           return this.value;
       };
       /**
        * Clean any existing subscription to change events
        */
       HyperTranslatePipe.prototype._dispose = function () {
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
       HyperTranslatePipe.prototype.ngOnDestroy = function () {
           this._dispose();
       };
       /** @nocollapse */ HyperTranslatePipe.ɵfac = function HyperTranslatePipe_Factory(t) { return new (t || HyperTranslatePipe)(core.ɵɵdirectiveInject(NgxTranslatorImplService), core.ɵɵinjectPipeChangeDetectorRef()); };
       /** @nocollapse */ HyperTranslatePipe.ɵpipe = core.ɵɵdefinePipe({ name: "hyperTrans", type: HyperTranslatePipe, pure: false });
       /** @nocollapse */ HyperTranslatePipe.ɵprov = core.ɵɵdefineInjectable({ token: HyperTranslatePipe, factory: HyperTranslatePipe.ɵfac });
       return HyperTranslatePipe;
   }());
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
   exports.NgxI18nModule = NgxI18nModule;
   exports.NgxTranslatorImplService = NgxTranslatorImplService;

   Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polpware-ngx-i18n.umd.js.map
