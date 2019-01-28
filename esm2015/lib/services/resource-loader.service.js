/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import * as externalInterface from '@polpware/fe-dependencies';
import { replace } from '@polpware/fe-utilities';
import { loadJsonUriP } from '@polpware/fe-data';
import { I18n } from '@polpware/fe-data';
import { ResourceLoader } from '@polpware/fe-data';
import { SlidingExpirationCache } from '@polpware/fe-data';
/** @type {?} */
const _ = externalInterface.underscore;
/**
 * @record
 */
function ILangOptionEntry() { }
if (false) {
    /** @type {?} */
    ILangOptionEntry.prototype.code;
    /** @type {?} */
    ILangOptionEntry.prototype.text;
}
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
export class ResourceLoaderService {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    ResourceLoaderService.prototype._resourceLoader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LWkxOG4vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzb3VyY2UtbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sS0FBSyxpQkFBaUIsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFLbkQsT0FBTyxFQUNILHNCQUFzQixFQUN6QixNQUFNLG1CQUFtQixDQUFDOztNQUVyQixDQUFDLEdBQUcsaUJBQWlCLENBQUMsVUFBVTs7OztBQUV0QywrQkFHQzs7O0lBRkcsZ0NBQWE7O0lBQ2IsZ0NBQWE7Ozs7Ozs7OztBQVlqQixTQUFTLFFBQVEsQ0FBQyxPQUFnQyxFQUFFLElBQVk7O1FBQ3hELElBQUksR0FBRyxJQUFJLElBQUksT0FBTzs7VUFDcEIsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25GLElBQUksS0FBSyxFQUFFO1FBQ1AsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7S0FDckI7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBSUQsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUk5QixZQUFZLE1BQWM7O2NBQ2hCLEtBQUssR0FBRyxJQUFJLHNCQUFzQixDQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLENBQUM7UUFDckUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7O0lBRUQsSUFBVyxjQUFjO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7OztJQVVELFdBQVcsQ0FBQyxRQUFnQixFQUFFLE1BQWM7O2NBQ2xDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZTtRQUMzQyxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQVMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQzdELElBQUksQ0FBQyxVQUFTLGtCQUFrQjtZQUM3QixPQUFPLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFTLGVBQWU7WUFDMUIsT0FBTyxRQUFRLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFTLGdCQUFnQjtZQUMzQixJQUFJLGdCQUFnQixLQUFLLE1BQU0sRUFBRTtnQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3hFO1lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBUyxnQkFBZ0I7WUFDM0IsUUFBUSxHQUFHLGdCQUFnQixDQUFDO1lBQzVCLE9BQU8sY0FBYyxDQUFDLFVBQVUsQ0FBUyxjQUFjLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBUyxlQUFlO1lBQzFCLE9BQU8sT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFTLFdBQVc7WUFDdEIsT0FBTyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQVMsWUFBWTtZQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7Ozs7SUFPRCxpQkFBaUI7UUFDYixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUMzRCxJQUFJLENBQUMsVUFBUyxrQkFBa0I7WUFDN0IsT0FBTyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7OztZQWhFSixVQUFVOzs7O1lBM0NVLE1BQU07Ozs7Ozs7SUE4Q3ZCLGdEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0ICogYXMgZXh0ZXJuYWxJbnRlcmZhY2UgZnJvbSAnQHBvbHB3YXJlL2ZlLWRlcGVuZGVuY2llcyc7XHJcbmltcG9ydCB7IHJlcGxhY2UgfSBmcm9tICdAcG9scHdhcmUvZmUtdXRpbGl0aWVzJztcclxuXHJcbmltcG9ydCB7IGxvYWRKc29uVXJpUCB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcclxuaW1wb3J0IHsgSTE4biB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcclxuaW1wb3J0IHsgUmVzb3VyY2VMb2FkZXIgfSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSVNsaWRpbmdFeHBpcmVDYWNoZVxyXG59IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcclxuaW1wb3J0IHtcclxuICAgIFNsaWRpbmdFeHBpcmF0aW9uQ2FjaGVcclxufSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XHJcblxyXG5jb25zdCBfID0gZXh0ZXJuYWxJbnRlcmZhY2UudW5kZXJzY29yZTtcclxuXHJcbmludGVyZmFjZSBJTGFuZ09wdGlvbkVudHJ5IHtcclxuICAgIGNvZGU6IHN0cmluZztcclxuICAgIHRleHQ6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFZlcmlmeSBpZiB0aGUgZ2l2ZW4gbGFuZyBpcyB2YWxpZC4gSWYgdGhlIGdpdmVuIGxhbmcgaXMgbm90IHZhbGlkLFxyXG4gKiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgYSBkZWZhdWx0IG9uZS5cclxuICogQHByaXZhdGVcclxuICogQGZ1bmN0aW9uIHZhbGlkYXRlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBhdmFsaWFibGUgbGFuZyBvcHRpb25zLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFuZyBUaGUgcmVxdWVzdGVkIGxhbmcgY29kZS5cclxuICogQHJldHVybnMge1N0cmluZ30gVmVyaWZpZWQgbGFuZyBjb2RlLlxyXG4gKi9cclxuZnVuY3Rpb24gdmFsaWRhdGUob3B0aW9uczogQXJyYXk8SUxhbmdPcHRpb25FbnRyeT4sIGNvZGU6IHN0cmluZykge1xyXG4gICAgbGV0IGxhbmcgPSBjb2RlIHx8ICdlbi11cyc7XHJcbiAgICBjb25zdCBlbnRyeSA9IF8uZmluZChvcHRpb25zLCBlID0+IGUuY29kZS5zdWJzdHJpbmcoMCwgMikgPT09IGxhbmcuc3Vic3RyaW5nKDAsIDIpKTtcclxuICAgIGlmIChlbnRyeSkge1xyXG4gICAgICAgIGxhbmcgPSBlbnRyeS5jb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYW5nO1xyXG59XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VMb2FkZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9yZXNvdXJjZUxvYWRlcjogUmVzb3VyY2VMb2FkZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobmdab25lOiBOZ1pvbmUpIHtcclxuICAgICAgICBjb25zdCBjYWNoZSA9IG5ldyBTbGlkaW5nRXhwaXJhdGlvbkNhY2hlPGFueT4oMyAqIDYwLCA1ICogNjAsIG5nWm9uZSk7XHJcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VMb2FkZXIgPSBuZXcgUmVzb3VyY2VMb2FkZXIoY2FjaGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVzb3VyY2VMb2FkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlTG9hZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIGRpY3Rpb25hcnkgZm9yIHRoZSBnaXZlbiBsYW5nIGNvZGUuXHJcbiAgICAgKiBAZnVuY3Rpb24gbG9hZFByb21pc2VcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYW5nQ29kZSBUaGUgcmVxdWVzdGVkIGxhbmd1YWdlIGNvZGUuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ31bXSBmaWx0ZXIgVGhlIG9wdGlvbmFsIGxhbmd1YWdlIGNvZGUgd2hpY2ggd2UgYXJlIG5vdCBpbnRlcmVzdGVkIGluLlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBwcm9taXNlIHdpdGggdGhlIHN0YXRlIG9mIHRoZSBsb2FkZWQgbGFuZ3VhZ2UgZGljdGlvbmFyeS5cclxuICAgICAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gICAgICovXHJcbiAgICBsb2FkUHJvbWlzZShsYW5nQ29kZTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHJlc291cmNlTG9hZGVyID0gdGhpcy5fcmVzb3VyY2VMb2FkZXI7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlTG9hZGVyLmdldFByb21pc2U8c3RyaW5nPignbGFuZy5vcHRpb25zJywgaWQgPT4gaWQpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc29sdmVkT3B0aW9uc1VybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRKc29uVXJpUChyZXNvbHZlZE9wdGlvbnNVcmwpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvbHZlZE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZShyZXNvbHZlZE9wdGlvbnMsIGxhbmdDb2RlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZWRMYW5nQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc29sdmVkTGFuZ0NvZGUgPT09IGZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTG9hZGluZyB0aGUgY3VycmVudCBsYW5ndWFnZTogJyArIHJlc29sdmVkTGFuZ0NvZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVkTGFuZ0NvZGU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGZpbHRlcmVkTGFuZ0NvZGUpIHtcclxuICAgICAgICAgICAgICAgIGxhbmdDb2RlID0gZmlsdGVyZWRMYW5nQ29kZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvdXJjZUxvYWRlci5nZXRQcm9taXNlPHN0cmluZz4oJ2xhbmcudXJsVG1wbCcsIGlkID0+IGlkKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZWRVcmxUbXBsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVwbGFjZShyZXNvbHZlZFVybFRtcGwsIHsgY29kZTogbGFuZ0NvZGUgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc29sdmVkVXJsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZEpzb25VcmlQKHJlc29sdmVkVXJsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZWREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBJMThuLmFkZChyZXNvbHZlZERhdGEuY29kZSwgcmVzb2x2ZWREYXRhLml0ZW1zKTtcclxuICAgICAgICAgICAgICAgIEkxOG4ucmVjeWNsZU90aGVycyhyZXNvbHZlZERhdGEuY29kZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZWREYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgbGFuZyBvcHRpb25zXHJcbiAgICAgKiBAZnVuY3Rpb24gbG9hZE9wdGlvblByb21pc2VcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBsb2FkT3B0aW9uUHJvbWlzZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVzb3VyY2VMb2FkZXIuZ2V0UHJvbWlzZSgnbGFuZy5vcHRpb25zJywgaWQgPT4gaWQpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc29sdmVkT3B0aW9uc1VybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRKc29uVXJpUChyZXNvbHZlZE9wdGlvbnNVcmwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=