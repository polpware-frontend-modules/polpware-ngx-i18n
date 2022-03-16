(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@polpware/fe-dependencies'), require('@polpware/fe-utilities'), require('@polpware/fe-data'), require('rxjs'), require('@angular/common')) :
   typeof define === 'function' && define.amd ? define('@polpware/ngx-i18n', ['exports', '@angular/core', '@polpware/fe-dependencies', '@polpware/fe-utilities', '@polpware/fe-data', 'rxjs', '@angular/common'], factory) :
   (global = global || self, factory((global.polpware = global.polpware || {}, global.polpware['ngx-i18n'] = {}), global.ng.core, global.feDependencies, global.feUtilities, global.feData, global.rxjs, global.ng.common));
}(this, (function (exports, core, feDependencies, feUtilities, feData, rxjs, common) { 'use strict';

   var _ = feDependencies.underscore;
   /**
    * Verify if the given lang is valid. If the given lang is not valid,
    * this function returns a default one.
    * @private
    * @function validate
    * @param {Object} options The avaliable lang options.
    * @param {String} lang The requested lang code.
    * @returns {String} Verified lang code.
    */
   function validate(options, code) {
       var lang = code || 'en-us';
       var entry = _.find(options, function (e) { return e.code.substring(0, 2) === lang.substring(0, 2); });
       if (entry) {
           lang = entry.code;
       }
       return lang;
   }
   var ResourceLoaderService = /** @class */ (function () {
       function ResourceLoaderService(ngZone) {
           var cache = new feData.SlidingExpirationCache(3 * 60, 5 * 60, ngZone);
           this._resourceLoader = new feData.ResourceLoader(cache);
       }
       Object.defineProperty(ResourceLoaderService.prototype, "resourceLoader", {
           get: function () {
               return this._resourceLoader;
           },
           enumerable: true,
           configurable: true
       });
       /**
        * Loads the dictionary for the given lang code.
        * @function loadPromise
        * @param {String} langCode The requested language code.
        * @param {String}[] filter The optional language code which we are not interested in.
        * @returns {Promise} The promise with the state of the loaded language dictionary.
        * @throws {Error}
        */
       ResourceLoaderService.prototype.loadPromise = function (langCode, filter) {
           var resourceLoader = this._resourceLoader;
           return resourceLoader.getPromise('lang.options', function (id) { return id; })
               .then(function (resolvedOptionsUrl) {
               return feData.loadJsonUriP(resolvedOptionsUrl);
           })
               .then(function (resolvedOptions) {
               return validate(resolvedOptions, langCode);
           })
               .then(function (resolvedLangCode) {
               if (resolvedLangCode === filter) {
                   throw new Error('Loading the current language: ' + resolvedLangCode);
               }
               return resolvedLangCode;
           })
               .then(function (filteredLangCode) {
               langCode = filteredLangCode;
               return resourceLoader.getPromise('lang.urlTmpl', function (id) { return id; });
           })
               .then(function (resolvedUrlTmpl) {
               return feUtilities.replace(resolvedUrlTmpl, { code: langCode });
           })
               .then(function (resolvedUrl) {
               return feData.loadJsonUriP(resolvedUrl);
           })
               .then(function (resolvedData) {
               feData.I18n.add(resolvedData.code, resolvedData.items);
               feData.I18n.recycleOthers(resolvedData.code);
               return resolvedData;
           });
       };
       /**
        * Load lang options
        * @function loadOptionPromise
        * @returns {Promise}
        */
       ResourceLoaderService.prototype.loadOptionPromise = function () {
           return this._resourceLoader.getPromise('lang.options', function (id) { return id; })
               .then(function (resolvedOptionsUrl) {
               return feData.loadJsonUriP(resolvedOptionsUrl);
           });
       };
       /** @nocollapse */ ResourceLoaderService.ɵfac = function ResourceLoaderService_Factory(t) { return new (t || ResourceLoaderService)(core.ɵɵinject(core.NgZone)); };
       /** @nocollapse */ ResourceLoaderService.ɵprov = core.ɵɵdefineInjectable({ token: ResourceLoaderService, factory: ResourceLoaderService.ɵfac });
       return ResourceLoaderService;
   }());
   /*@__PURE__*/ (function () { core.ɵsetClassMetadata(ResourceLoaderService, [{
           type: core.Injectable
       }], function () { return [{ type: core.NgZone }]; }, null); })();

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
           // Get
           var ks = [];
           if (typeof key == 'string') {
               ks = key.split('.');
           }
           else {
               ks = key;
           }
           ks = ks.filter(function (a) { return a; });
           var res = this._dict;
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
           var v = res !== undefined ? res : key;
           return rxjs.of(v);
       };
       NgxTranslatorImplService.prototype.loadResources = function (resources) {
           // todo: A better implementation
           Object.assign(this._dict, resources);
       };
       return NgxTranslatorImplService;
   }());

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
   exports.ResourceLoaderService = ResourceLoaderService;

   Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polpware-ngx-i18n.umd.js.map
