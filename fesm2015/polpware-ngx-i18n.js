import { Injectable, NgZone } from '@angular/core';
import { underscore } from '@polpware/fe-dependencies';
import { replace } from '@polpware/fe-utilities';
import { loadJsonUriP, I18n, ResourceLoader, SlidingExpirationCache } from '@polpware/fe-data';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const _ = underscore;
/**
 * Verify if the given lang is valid. If the given lang is not valid,
 * this function returns a default one.
 * @param {?} options
 * @param {?} code
 * @return {?}
 */
function validate(options, code) {
    /** @type {?} */
    let lang = code || 'en-us';
    /** @type {?} */
    const entry = _.find(options, e => e.code.substring(0, 2) === lang.substring(0, 2));
    if (entry) {
        lang = entry.code;
    }
    return lang;
}
class ResourceLoaderService {
    /**
     * @param {?} ngZone
     */
    constructor(ngZone) {
        /** @type {?} */
        const cache = new SlidingExpirationCache(3 * 60, 5 * 60, ngZone);
        this._resourceLoader = new ResourceLoader(cache);
    }
    /**
     * @return {?}
     */
    get resourceLoader() {
        return this._resourceLoader;
    }
    /**
     * Loads the dictionary for the given lang code.
     * @throws {Error}
     * @param {?} langCode
     * @param {?} filter
     * @return {?}
     */
    loadPromise(langCode, filter) {
        /** @type {?} */
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
     * @return {?}
     */
    loadOptionPromise() {
        return this._resourceLoader.getPromise('lang.options', id => id)
            .then(function (resolvedOptionsUrl) {
            return loadJsonUriP(resolvedOptionsUrl);
        });
    }
}
ResourceLoaderService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ResourceLoaderService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ResourceLoaderService };

//# sourceMappingURL=polpware-ngx-i18n.js.map