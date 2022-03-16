import { ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxTranslatorImplService } from './ngx-translator-impl.service';
import * as i0 from "@angular/core";
export declare class HyperTranslatePipe implements PipeTransform, OnDestroy {
    private translate;
    private _ref;
    value: string;
    lastKey: string | null;
    lastParams: any[];
    onTranslationChange: Subscription | undefined;
    onLangChange: Subscription | undefined;
    onDefaultLangChange: Subscription | undefined;
    constructor(translate: NgxTranslatorImplService, _ref: ChangeDetectorRef);
    updateValue(key: string, interpolateParams?: Object, translations?: any): void;
    transform(query: string, ...args: any[]): any;
    /**
     * Clean any existing subscription to change events
     */
    private _dispose;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<HyperTranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<HyperTranslatePipe, "hyperTrans">;
    static ɵprov: i0.ɵɵInjectableDef<HyperTranslatePipe>;
}