import { Injectable, NgZone } from '@angular/core';
import * as externalInterface from '@polpware/fe-dependencies';
import { replace } from '@polpware/fe-utilities';
import { loadJsonUriP } from '@polpware/fe-data';
import { I18n } from '@polpware/fe-data';
import { ResourceLoader } from '@polpware/fe-data';
import { SlidingExpirationCache } from '@polpware/fe-data';
import * as i0 from "@angular/core";
const _ = externalInterface.underscore;
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
export class ResourceLoaderService {
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
/** @nocollapse */ ResourceLoaderService.ɵfac = function ResourceLoaderService_Factory(t) { return new (t || ResourceLoaderService)(i0.ɵɵinject(i0.NgZone)); };
/** @nocollapse */ ResourceLoaderService.ɵprov = i0.ɵɵdefineInjectable({ token: ResourceLoaderService, factory: ResourceLoaderService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResourceLoaderService, [{
        type: Injectable
    }], function () { return [{ type: i0.NgZone }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LWkxOG4vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzb3VyY2UtbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxLQUFLLGlCQUFpQixNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUtuRCxPQUFPLEVBQ0gsc0JBQXNCLEVBQ3pCLE1BQU0sbUJBQW1CLENBQUM7O0FBRTNCLE1BQU0sQ0FBQyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztBQU92Qzs7Ozs7Ozs7R0FRRztBQUNILFNBQVMsUUFBUSxDQUFDLE9BQWdDLEVBQUUsSUFBWTtJQUM1RCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksT0FBTyxDQUFDO0lBQzNCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsSUFBSSxLQUFLLEVBQUU7UUFDUCxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztLQUNyQjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFJRCxNQUFNLE9BQU8scUJBQXFCO0lBSTlCLFlBQVksTUFBYztRQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLHNCQUFzQixDQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFXLGNBQWM7UUFDckIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsV0FBVyxDQUFDLFFBQWdCLEVBQUUsTUFBYztRQUN4QyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzVDLE9BQU8sY0FBYyxDQUFDLFVBQVUsQ0FBUyxjQUFjLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDN0QsSUFBSSxDQUFDLFVBQVMsa0JBQWtCO1lBQzdCLE9BQU8sWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQVMsZUFBZTtZQUMxQixPQUFPLFFBQVEsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQVMsZ0JBQWdCO1lBQzNCLElBQUksZ0JBQWdCLEtBQUssTUFBTSxFQUFFO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxHQUFHLGdCQUFnQixDQUFDLENBQUM7YUFDeEU7WUFDRCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFTLGdCQUFnQjtZQUMzQixRQUFRLEdBQUcsZ0JBQWdCLENBQUM7WUFDNUIsT0FBTyxjQUFjLENBQUMsVUFBVSxDQUFTLGNBQWMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFTLGVBQWU7WUFDMUIsT0FBTyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQVMsV0FBVztZQUN0QixPQUFPLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBUyxZQUFZO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQzNELElBQUksQ0FBQyxVQUFTLGtCQUFrQjtZQUM3QixPQUFPLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7NkdBL0RRLHFCQUFxQjtnRkFBckIscUJBQXFCLFdBQXJCLHFCQUFxQjtrREFBckIscUJBQXFCO2NBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCAqIGFzIGV4dGVybmFsSW50ZXJmYWNlIGZyb20gJ0Bwb2xwd2FyZS9mZS1kZXBlbmRlbmNpZXMnO1xyXG5pbXBvcnQgeyByZXBsYWNlIH0gZnJvbSAnQHBvbHB3YXJlL2ZlLXV0aWxpdGllcyc7XHJcblxyXG5pbXBvcnQgeyBsb2FkSnNvblVyaVAgfSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XHJcbmltcG9ydCB7IEkxOG4gfSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XHJcbmltcG9ydCB7IFJlc291cmNlTG9hZGVyIH0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElTbGlkaW5nRXhwaXJlQ2FjaGVcclxufSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XHJcbmltcG9ydCB7XHJcbiAgICBTbGlkaW5nRXhwaXJhdGlvbkNhY2hlXHJcbn0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xyXG5cclxuY29uc3QgXyA9IGV4dGVybmFsSW50ZXJmYWNlLnVuZGVyc2NvcmU7XHJcblxyXG5pbnRlcmZhY2UgSUxhbmdPcHRpb25FbnRyeSB7XHJcbiAgICBjb2RlOiBzdHJpbmc7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBWZXJpZnkgaWYgdGhlIGdpdmVuIGxhbmcgaXMgdmFsaWQuIElmIHRoZSBnaXZlbiBsYW5nIGlzIG5vdCB2YWxpZCxcclxuICogdGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgZGVmYXVsdCBvbmUuXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBmdW5jdGlvbiB2YWxpZGF0ZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgYXZhbGlhYmxlIGxhbmcgb3B0aW9ucy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGxhbmcgVGhlIHJlcXVlc3RlZCBsYW5nIGNvZGUuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFZlcmlmaWVkIGxhbmcgY29kZS5cclxuICovXHJcbmZ1bmN0aW9uIHZhbGlkYXRlKG9wdGlvbnM6IEFycmF5PElMYW5nT3B0aW9uRW50cnk+LCBjb2RlOiBzdHJpbmcpIHtcclxuICAgIGxldCBsYW5nID0gY29kZSB8fCAnZW4tdXMnO1xyXG4gICAgY29uc3QgZW50cnkgPSBfLmZpbmQob3B0aW9ucywgZSA9PiBlLmNvZGUuc3Vic3RyaW5nKDAsIDIpID09PSBsYW5nLnN1YnN0cmluZygwLCAyKSk7XHJcbiAgICBpZiAoZW50cnkpIHtcclxuICAgICAgICBsYW5nID0gZW50cnkuY29kZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFuZztcclxufVxyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlc291cmNlTG9hZGVyU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVzb3VyY2VMb2FkZXI6IFJlc291cmNlTG9hZGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5nWm9uZTogTmdab25lKSB7XHJcbiAgICAgICAgY29uc3QgY2FjaGUgPSBuZXcgU2xpZGluZ0V4cGlyYXRpb25DYWNoZTxhbnk+KDMgKiA2MCwgNSAqIDYwLCBuZ1pvbmUpO1xyXG4gICAgICAgIHRoaXMuX3Jlc291cmNlTG9hZGVyID0gbmV3IFJlc291cmNlTG9hZGVyKGNhY2hlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlc291cmNlTG9hZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZUxvYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBkaWN0aW9uYXJ5IGZvciB0aGUgZ2l2ZW4gbGFuZyBjb2RlLlxyXG4gICAgICogQGZ1bmN0aW9uIGxvYWRQcm9taXNlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbGFuZ0NvZGUgVGhlIHJlcXVlc3RlZCBsYW5ndWFnZSBjb2RlLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9W10gZmlsdGVyIFRoZSBvcHRpb25hbCBsYW5ndWFnZSBjb2RlIHdoaWNoIHdlIGFyZSBub3QgaW50ZXJlc3RlZCBpbi5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcHJvbWlzZSB3aXRoIHRoZSBzdGF0ZSBvZiB0aGUgbG9hZGVkIGxhbmd1YWdlIGRpY3Rpb25hcnkuXHJcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn1cclxuICAgICAqL1xyXG4gICAgbG9hZFByb21pc2UobGFuZ0NvZGU6IHN0cmluZywgZmlsdGVyOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCByZXNvdXJjZUxvYWRlciA9IHRoaXMuX3Jlc291cmNlTG9hZGVyO1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUxvYWRlci5nZXRQcm9taXNlPHN0cmluZz4oJ2xhbmcub3B0aW9ucycsIGlkID0+IGlkKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvbHZlZE9wdGlvbnNVcmwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkSnNvblVyaVAocmVzb2x2ZWRPcHRpb25zVXJsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZWRPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdGUocmVzb2x2ZWRPcHRpb25zLCBsYW5nQ29kZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc29sdmVkTGFuZ0NvZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlZExhbmdDb2RlID09PSBmaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvYWRpbmcgdGhlIGN1cnJlbnQgbGFuZ3VhZ2U6ICcgKyByZXNvbHZlZExhbmdDb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlZExhbmdDb2RlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihmaWx0ZXJlZExhbmdDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBsYW5nQ29kZSA9IGZpbHRlcmVkTGFuZ0NvZGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb3VyY2VMb2FkZXIuZ2V0UHJvbWlzZTxzdHJpbmc+KCdsYW5nLnVybFRtcGwnLCBpZCA9PiBpZCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc29sdmVkVXJsVG1wbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UocmVzb2x2ZWRVcmxUbXBsLCB7IGNvZGU6IGxhbmdDb2RlIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvbHZlZFVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRKc29uVXJpUChyZXNvbHZlZFVybCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc29sdmVkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgSTE4bi5hZGQocmVzb2x2ZWREYXRhLmNvZGUsIHJlc29sdmVkRGF0YS5pdGVtcyk7XHJcbiAgICAgICAgICAgICAgICBJMThuLnJlY3ljbGVPdGhlcnMocmVzb2x2ZWREYXRhLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVkRGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGxhbmcgb3B0aW9uc1xyXG4gICAgICogQGZ1bmN0aW9uIGxvYWRPcHRpb25Qcm9taXNlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgbG9hZE9wdGlvblByb21pc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlTG9hZGVyLmdldFByb21pc2UoJ2xhbmcub3B0aW9ucycsIGlkID0+IGlkKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvbHZlZE9wdGlvbnNVcmwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkSnNvblVyaVAocmVzb2x2ZWRPcHRpb25zVXJsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19