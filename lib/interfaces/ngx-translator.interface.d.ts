import { EventEmitter } from "@angular/core";
import { Observable } from 'rxjs';
export interface TranslationChangeEvent {
    translations: any;
    lang: string;
}
export interface LangChangeEvent {
    lang: string;
    translations: any;
}
export interface DefaultLangChangeEvent {
    lang: string;
    translations: any;
}
export interface INgxTranslator {
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
