import { ChangeDetectorRef } from '@angular/core';
import { HyperTranslatePipeBase } from './hyper-translator-pipe-base';
import { NgxTranslatorImplService } from './ngx-translator-impl.service';
import * as i0 from "@angular/core";
export declare class HyperTranslatePipe extends HyperTranslatePipeBase {
    protected _translate: NgxTranslatorImplService;
    protected _ref: ChangeDetectorRef;
    constructor(_translate: NgxTranslatorImplService, _ref: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<HyperTranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HyperTranslatePipe, "hyperTrans">;
    static ɵprov: i0.ɵɵInjectableDeclaration<HyperTranslatePipe>;
}
