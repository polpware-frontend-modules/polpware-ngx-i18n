import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { DefaultLangChangeEvent, INgxTranslator, LangChangeEvent, TranslationChangeEvent } from '../interfaces/ngx-translator.interface';
export declare class NgxTranslatorImplService implements INgxTranslator {
    private _dict;
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
