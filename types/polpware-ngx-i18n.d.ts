import * as i0 from '@angular/core';
import { EventEmitter, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as i2 from '@angular/common';

interface TranslationChangeEvent {
    translations: any;
    lang: string;
}
interface LangChangeEvent {
    lang: string;
    translations: any;
}
interface DefaultLangChangeEvent {
    lang: string;
    translations: any;
}
interface INgxTranslator {
    /**
     * An EventEmitter to listen to translation change events
     * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
       *     // do something
       * });
     */
    onTranslationChange: EventEmitter<TranslationChangeEvent>;
    /**
     * An EventEmitter to listen to lang change events
     * onLangChange.subscribe((params: LangChangeEvent) => {
       *     // do something
       * });
     */
    onLangChange: EventEmitter<LangChangeEvent>;
    /**
     * An EventEmitter to listen to default lang change events
     * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
       *     // do something
       * });
     */
    onDefaultLangChange: EventEmitter<DefaultLangChangeEvent>;
    /**
     * The default lang to fallback when translations are missing on the current lang
     */
    defaultLang: string;
    /**
     * The lang currently used
     */
    currentLang: string;
    /**
     * an array of langs
     */
    langs: string[];
    /**
     * Returns the parsed result of the translations
     */
    getParsedResult(translations: any, key: any, interpolateParams?: Object): any;
    /**
      * Gets the translated value of a key (or an array of keys)
      * @returns the translated key, or an object of translated keys
      */
    get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
}

declare class NgxTranslatorImplService implements INgxTranslator {
    protected _dict: {
        [key: string]: any;
    };
    onTranslationChange: EventEmitter<TranslationChangeEvent>;
    onLangChange: EventEmitter<LangChangeEvent>;
    onDefaultLangChange: EventEmitter<DefaultLangChangeEvent>;
    defaultLang: string;
    currentLang: string;
    langs: any[];
    getParsedResult(translations: any, key: any, interpolateParams?: Object): any;
    get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
    loadResources(resources: {
        [key: string]: any;
    }): void;
}

declare abstract class HyperTranslatePipeBase implements PipeTransform, OnDestroy {
    value: string;
    lastKey: string | null;
    lastParams: any[];
    onTranslationChange: Subscription | undefined;
    onLangChange: Subscription | undefined;
    onDefaultLangChange: Subscription | undefined;
    protected _translate: INgxTranslator;
    protected _ref: ChangeDetectorRef;
    updateValue(key: string, interpolateParams?: Object, translations?: any): void;
    transform(query: string, ...args: any[]): any;
    /**
     * Clean any existing subscription to change events
     */
    private _dispose;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HyperTranslatePipeBase, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HyperTranslatePipeBase, "hyperTransBase", false>;
}

declare class HyperTranslatePipe extends HyperTranslatePipeBase {
    protected _translate: NgxTranslatorImplService;
    protected _ref: ChangeDetectorRef;
    constructor(_translate: NgxTranslatorImplService, _ref: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<HyperTranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HyperTranslatePipe, "hyperTrans", false>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HyperTranslatePipe>;
}

declare class NgxI18nModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxI18nModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxI18nModule, [typeof HyperTranslatePipe], [typeof i2.CommonModule], [typeof HyperTranslatePipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxI18nModule>;
}

export { HyperTranslatePipe, HyperTranslatePipeBase, NgxI18nModule, NgxTranslatorImplService };
export type { DefaultLangChangeEvent, INgxTranslator, LangChangeEvent, TranslationChangeEvent };
