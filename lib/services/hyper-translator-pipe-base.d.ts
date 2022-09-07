import { ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { INgxTranslator } from '../interfaces/ngx-translator.interface';
import * as i0 from "@angular/core";
export declare abstract class HyperTranslatePipeBase implements PipeTransform, OnDestroy {
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
    static ɵpipe: i0.ɵɵPipeDeclaration<HyperTranslatePipeBase, "hyperTransBase">;
}
