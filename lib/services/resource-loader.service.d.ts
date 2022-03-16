import { NgZone } from '@angular/core';
import { ResourceLoader } from '@polpware/fe-data';
import * as i0 from "@angular/core";
export declare class ResourceLoaderService {
    private _resourceLoader;
    constructor(ngZone: NgZone);
    get resourceLoader(): ResourceLoader;
    /**
     * Loads the dictionary for the given lang code.
     * @function loadPromise
     * @param {String} langCode The requested language code.
     * @param {String}[] filter The optional language code which we are not interested in.
     * @returns {Promise} The promise with the state of the loaded language dictionary.
     * @throws {Error}
     */
    loadPromise(langCode: string, filter: string): PromiseLike<any>;
    /**
     * Load lang options
     * @function loadOptionPromise
     * @returns {Promise}
     */
    loadOptionPromise(): PromiseLike<any>;
    static ɵfac: i0.ɵɵFactoryDef<ResourceLoaderService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ResourceLoaderService>;
}
