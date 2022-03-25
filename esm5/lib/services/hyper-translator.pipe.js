import { __extends } from "tslib";
import { ChangeDetectorRef, Injectable, Pipe } from '@angular/core';
import { HyperTranslatePipeBase } from './hyper-translator-pipe-base';
import { NgxTranslatorImplService } from './ngx-translator-impl.service';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-translator-impl.service";
var HyperTranslatePipe = /** @class */ (function (_super) {
    __extends(HyperTranslatePipe, _super);
    function HyperTranslatePipe(_translate, _ref) {
        var _this = _super.call(this) || this;
        _this._translate = _translate;
        _this._ref = _ref;
        return _this;
    }
    /** @nocollapse */ HyperTranslatePipe.ɵfac = function HyperTranslatePipe_Factory(t) { return new (t || HyperTranslatePipe)(i0.ɵɵdirectiveInject(i1.NgxTranslatorImplService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    /** @nocollapse */ HyperTranslatePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "hyperTrans", type: HyperTranslatePipe, pure: false });
    /** @nocollapse */ HyperTranslatePipe.ɵprov = i0.ɵɵdefineInjectable({ token: HyperTranslatePipe, factory: HyperTranslatePipe.ɵfac });
    return HyperTranslatePipe;
}(HyperTranslatePipeBase));
export { HyperTranslatePipe };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(HyperTranslatePipe, [{
        type: Injectable
    }, {
        type: Pipe,
        args: [{
                name: 'hyperTrans',
                pure: false // required to update the value when the promise is resolved
            }]
    }], function () { return [{ type: i1.NgxTranslatorImplService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXItdHJhbnNsYXRvci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1pMThuLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2h5cGVyLXRyYW5zbGF0b3IucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7OztBQUV6RTtJQUt3QyxzQ0FBc0I7SUFFMUQsNEJBQXNCLFVBQW9DLEVBQVksSUFBdUI7UUFBN0YsWUFDSSxpQkFBTyxTQUNWO1FBRnFCLGdCQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUFZLFVBQUksR0FBSixJQUFJLENBQW1COztJQUU3RixDQUFDOzJHQUpRLGtCQUFrQjs4RkFBbEIsa0JBQWtCO2lGQUFsQixrQkFBa0IsV0FBbEIsa0JBQWtCOzZCQVQvQjtDQWNDLEFBVkQsQ0FLd0Msc0JBQXNCLEdBSzdEO1NBTFksa0JBQWtCO2tEQUFsQixrQkFBa0I7Y0FMOUIsVUFBVTs7Y0FDVixJQUFJO2VBQUM7Z0JBQ0YsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLElBQUksRUFBRSxLQUFLLENBQUMsNERBQTREO2FBQzNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdGFibGUsIFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHlwZXJUcmFuc2xhdGVQaXBlQmFzZSB9IGZyb20gJy4vaHlwZXItdHJhbnNsYXRvci1waXBlLWJhc2UnO1xyXG5pbXBvcnQgeyBOZ3hUcmFuc2xhdG9ySW1wbFNlcnZpY2UgfSBmcm9tICcuL25neC10cmFuc2xhdG9yLWltcGwuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdoeXBlclRyYW5zJyxcclxuICAgIHB1cmU6IGZhbHNlIC8vIHJlcXVpcmVkIHRvIHVwZGF0ZSB0aGUgdmFsdWUgd2hlbiB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSHlwZXJUcmFuc2xhdGVQaXBlIGV4dGVuZHMgSHlwZXJUcmFuc2xhdGVQaXBlQmFzZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF90cmFuc2xhdGU6IE5neFRyYW5zbGF0b3JJbXBsU2VydmljZSwgcHJvdGVjdGVkIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG4iXX0=