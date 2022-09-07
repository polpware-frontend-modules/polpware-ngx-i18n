import { Injectable, Pipe } from '@angular/core';
import { HyperTranslatePipeBase } from './hyper-translator-pipe-base';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-translator-impl.service";
export class HyperTranslatePipe extends HyperTranslatePipeBase {
    constructor(_translate, _ref) {
        super();
        this._translate = _translate;
        this._ref = _ref;
    }
}
/** @nocollapse */ HyperTranslatePipe.ɵfac = function HyperTranslatePipe_Factory(t) { return new (t || HyperTranslatePipe)(i0.ɵɵdirectiveInject(i1.NgxTranslatorImplService, 16), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef, 16)); };
/** @nocollapse */ HyperTranslatePipe.ɵpipe = /** @pureOrBreakMyCode */ i0.ɵɵdefinePipe({ name: "hyperTrans", type: HyperTranslatePipe, pure: false });
/** @nocollapse */ HyperTranslatePipe.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: HyperTranslatePipe, factory: HyperTranslatePipe.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HyperTranslatePipe, [{
        type: Injectable
    }, {
        type: Pipe,
        args: [{
                name: 'hyperTrans',
                pure: false // required to update the value when the promise is resolved
            }]
    }], function () { return [{ type: i1.NgxTranslatorImplService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXItdHJhbnNsYXRvci5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcG9scHdhcmUvbmd4LWkxOG4vc3JjL2xpYi9zZXJ2aWNlcy9oeXBlci10cmFuc2xhdG9yLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFxQixVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7QUFRdEUsTUFBTSxPQUFPLGtCQUFtQixTQUFRLHNCQUFzQjtJQUUxRCxZQUFzQixVQUFvQyxFQUFZLElBQXVCO1FBQ3pGLEtBQUssRUFBRSxDQUFDO1FBRFUsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFBWSxTQUFJLEdBQUosSUFBSSxDQUFtQjtJQUU3RixDQUFDOzt1R0FKUSxrQkFBa0I7b0hBQWxCLGtCQUFrQjt1R0FBbEIsa0JBQWtCLFdBQWxCLGtCQUFrQjt1RkFBbEIsa0JBQWtCO2NBTDlCLFVBQVU7O2NBQ1YsSUFBSTtlQUFDO2dCQUNGLElBQUksRUFBRSxZQUFZO2dCQUNsQixJQUFJLEVBQUUsS0FBSyxDQUFDLDREQUE0RDthQUMzRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBJbmplY3RhYmxlLCBQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh5cGVyVHJhbnNsYXRlUGlwZUJhc2UgfSBmcm9tICcuL2h5cGVyLXRyYW5zbGF0b3ItcGlwZS1iYXNlJztcclxuaW1wb3J0IHsgTmd4VHJhbnNsYXRvckltcGxTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtdHJhbnNsYXRvci1pbXBsLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnaHlwZXJUcmFucycsXHJcbiAgICBwdXJlOiBmYWxzZSAvLyByZXF1aXJlZCB0byB1cGRhdGUgdGhlIHZhbHVlIHdoZW4gdGhlIHByb21pc2UgaXMgcmVzb2x2ZWRcclxufSlcclxuZXhwb3J0IGNsYXNzIEh5cGVyVHJhbnNsYXRlUGlwZSBleHRlbmRzIEh5cGVyVHJhbnNsYXRlUGlwZUJhc2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfdHJhbnNsYXRlOiBOZ3hUcmFuc2xhdG9ySW1wbFNlcnZpY2UsIHByb3RlY3RlZCBfcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuIl19