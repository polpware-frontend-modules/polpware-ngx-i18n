import { ɵɵinject, NgZone, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, EventEmitter, ɵɵdirectiveInject, ɵɵinjectPipeChangeDetectorRef, ɵɵdefinePipe, Pipe, ChangeDetectorRef, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { underscore } from '@polpware/fe-dependencies';
import { replace } from '@polpware/fe-utilities';
import { SlidingExpirationCache, ResourceLoader, loadJsonUriP, I18n } from '@polpware/fe-data';
import { of, isObservable } from 'rxjs';
import { CommonModule } from '@angular/common';

const _ = underscore;
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
    let lang = code || 'en-us';
    const entry = _.find(options, e => e.code.substring(0, 2) === lang.substring(0, 2));
    if (entry) {
        lang = entry.code;
    }
    return lang;
}
class ResourceLoaderService {
    constructor(ngZone) {
        const cache = new SlidingExpirationCache(3 * 60, 5 * 60, ngZone);
        this._resourceLoader = new ResourceLoader(cache);
    }
    get resourceLoader() {
        return this._resourceLoader;
    }
    /**
     * Loads the dictionary for the given lang code.
     * @function loadPromise
     * @param {String} langCode The requested language code.
     * @param {String}[] filter The optional language code which we are not interested in.
     * @returns {Promise} The promise with the state of the loaded language dictionary.
     * @throws {Error}
     */
    loadPromise(langCode, filter) {
        const resourceLoader = this._resourceLoader;
        return resourceLoader.getPromise('lang.options', id => id)
            .then(function (resolvedOptionsUrl) {
            return loadJsonUriP(resolvedOptionsUrl);
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
            return resourceLoader.getPromise('lang.urlTmpl', id => id);
        })
            .then(function (resolvedUrlTmpl) {
            return replace(resolvedUrlTmpl, { code: langCode });
        })
            .then(function (resolvedUrl) {
            return loadJsonUriP(resolvedUrl);
        })
            .then(function (resolvedData) {
            I18n.add(resolvedData.code, resolvedData.items);
            I18n.recycleOthers(resolvedData.code);
            return resolvedData;
        });
    }
    /**
     * Load lang options
     * @function loadOptionPromise
     * @returns {Promise}
     */
    loadOptionPromise() {
        return this._resourceLoader.getPromise('lang.options', id => id)
            .then(function (resolvedOptionsUrl) {
            return loadJsonUriP(resolvedOptionsUrl);
        });
    }
}
/** @nocollapse */ ResourceLoaderService.ɵfac = function ResourceLoaderService_Factory(t) { return new (t || ResourceLoaderService)(ɵɵinject(NgZone)); };
/** @nocollapse */ ResourceLoaderService.ɵprov = ɵɵdefineInjectable({ token: ResourceLoaderService, factory: ResourceLoaderService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResourceLoaderService, [{
        type: Injectable
    }], function () { return [{ type: NgZone }]; }, null); })();

/* On purpose we do not make it injectable.
   It is up to the host to define how to do this */
class NgxTranslatorImplService {
    constructor() {
        this._dict = {};
        this.onTranslationChange = new EventEmitter();
        this.onLangChange = new EventEmitter();
        this.onDefaultLangChange = new EventEmitter();
        this.defaultLang = '';
        this.currentLang = '';
        this.langs = [];
    }
    getParsedResult(translations, key, interpolateParams) {
        return key;
    }
    get(key, interpolateParams) {
        // Get
        let ks = [];
        if (typeof key == 'string') {
            ks = key.split('.');
        }
        else {
            ks = key;
        }
        ks = ks.filter(a => a);
        let res = this._dict;
        for (let i = 0; i < ks.length; i++) {
            const c = ks[i];
            if (res[c]) {
                res = res[c];
            }
            else {
                res = undefined;
                break;
            }
        }
        const v = res !== undefined ? res : key;
        return of(v);
    }
    loadResources(resources) {
        // todo: A better implementation
        Object.assign(this._dict, resources);
    }
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
    let t1 = typeof o1, t2 = typeof o2, length, key, keySet;
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
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                }
                else {
                    output[key] = mergeDeep(target[key], source[key]);
                }
            }
            else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

class HyperTranslatePipe {
    constructor(translate, _ref) {
        this.translate = translate;
        this._ref = _ref;
        this.value = '';
        this.lastKey = null;
        this.lastParams = [];
    }
    updateValue(key, interpolateParams, translations) {
        let onTranslation = (res) => {
            this.value = res !== undefined ? res : key;
            this.lastKey = key;
            this._ref.markForCheck();
        };
        if (translations) {
            let res = this.translate.getParsedResult(translations, key, interpolateParams);
            if (isObservable(res.subscribe)) {
                res.subscribe(onTranslation);
            }
            else {
                onTranslation(res);
            }
        }
        this.translate.get(key, interpolateParams).subscribe(onTranslation);
    }
    transform(query, ...args) {
        if (!query || !query.length) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
            return this.value;
        }
        let interpolateParams = undefined;
        if (isDefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                let validArgs = args[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`);
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
            this.onTranslationChange = this.translate.onTranslationChange.subscribe((event) => {
                if (this.lastKey && event.lang === this.translate.currentLang) {
                    this.lastKey = null;
                    this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this.translate.onLangChange.subscribe((event) => {
                if (this.lastKey) {
                    this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChange) {
            this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(() => {
                if (this.lastKey) {
                    this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    this.updateValue(query, interpolateParams);
                }
            });
        }
        return this.value;
    }
    /**
     * Clean any existing subscription to change events
     */
    _dispose() {
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
    }
    ngOnDestroy() {
        this._dispose();
    }
}
/** @nocollapse */ HyperTranslatePipe.ɵfac = function HyperTranslatePipe_Factory(t) { return new (t || HyperTranslatePipe)(ɵɵdirectiveInject(NgxTranslatorImplService), ɵɵinjectPipeChangeDetectorRef()); };
/** @nocollapse */ HyperTranslatePipe.ɵpipe = ɵɵdefinePipe({ name: "hyperTrans", type: HyperTranslatePipe, pure: false });
/** @nocollapse */ HyperTranslatePipe.ɵprov = ɵɵdefineInjectable({ token: HyperTranslatePipe, factory: HyperTranslatePipe.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(HyperTranslatePipe, [{
        type: Injectable
    }, {
        type: Pipe,
        args: [{
                name: 'hyperTrans',
                pure: false // required to update the value when the promise is resolved
            }]
    }], function () { return [{ type: NgxTranslatorImplService }, { type: ChangeDetectorRef }]; }, null); })();

class NgxI18nModule {
}
/** @nocollapse */ NgxI18nModule.ɵmod = ɵɵdefineNgModule({ type: NgxI18nModule });
/** @nocollapse */ NgxI18nModule.ɵinj = ɵɵdefineInjector({ factory: function NgxI18nModule_Factory(t) { return new (t || NgxI18nModule)(); }, imports: [[
            CommonModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgxI18nModule, { declarations: [HyperTranslatePipe], imports: [CommonModule], exports: [HyperTranslatePipe] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxI18nModule, [{
        type: NgModule,
        args: [{
                declarations: [HyperTranslatePipe],
                imports: [
                    CommonModule,
                ],
                exports: [HyperTranslatePipe]
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-i18n
 */

/**
 * Generated bundle index. Do not edit.
 */

export { HyperTranslatePipe, NgxI18nModule, NgxTranslatorImplService, ResourceLoaderService };
//# sourceMappingURL=polpware-ngx-i18n.js.map
