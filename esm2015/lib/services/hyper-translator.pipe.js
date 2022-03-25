import { ChangeDetectorRef, Injectable, Pipe } from '@angular/core';
import { HyperTranslatePipeBase } from './hyper-translator-pipe-base';
import { NgxTranslatorImplService } from './ngx-translator-impl.service';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-translator-impl.service";
export class HyperTranslatePipe extends HyperTranslatePipeBase {
    constructor(_translate, _ref) {
        super();
        this._translate = _translate;
        this._ref = _ref;
    }
}
/** @nocollapse */ HyperTranslatePipe.ɵfac = function HyperTranslatePipe_Factory(t) { return new (t || HyperTranslatePipe)(i0.ɵɵdirectiveInject(i1.NgxTranslatorImplService), i0.ɵɵinjectPipeChangeDetectorRef()); };
/** @nocollapse */ HyperTranslatePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "hyperTrans", type: HyperTranslatePipe, pure: false });
/** @nocollapse */ HyperTranslatePipe.ɵprov = i0.ɵɵdefineInjectable({ token: HyperTranslatePipe, factory: HyperTranslatePipe.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(HyperTranslatePipe, [{
        type: Injectable
    }, {
        type: Pipe,
        args: [{
                name: 'hyperTrans',
                pure: false // required to update the value when the promise is resolved
            }]
    }], function () { return [{ type: i1.NgxTranslatorImplService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXItdHJhbnNsYXRvci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1pMThuLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2h5cGVyLXRyYW5zbGF0b3IucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7O0FBT3pFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxzQkFBc0I7SUFFMUQsWUFBc0IsVUFBb0MsRUFBWSxJQUF1QjtRQUN6RixLQUFLLEVBQUUsQ0FBQztRQURVLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBbUI7SUFFN0YsQ0FBQzs7dUdBSlEsa0JBQWtCOzBGQUFsQixrQkFBa0I7NkVBQWxCLGtCQUFrQixXQUFsQixrQkFBa0I7a0RBQWxCLGtCQUFrQjtjQUw5QixVQUFVOztjQUNWLElBQUk7ZUFBQztnQkFDRixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyw0REFBNEQ7YUFDM0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0YWJsZSwgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIeXBlclRyYW5zbGF0ZVBpcGVCYXNlIH0gZnJvbSAnLi9oeXBlci10cmFuc2xhdG9yLXBpcGUtYmFzZSc7XHJcbmltcG9ydCB7IE5neFRyYW5zbGF0b3JJbXBsU2VydmljZSB9IGZyb20gJy4vbmd4LXRyYW5zbGF0b3ItaW1wbC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2h5cGVyVHJhbnMnLFxyXG4gICAgcHVyZTogZmFsc2UgLy8gcmVxdWlyZWQgdG8gdXBkYXRlIHRoZSB2YWx1ZSB3aGVuIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIeXBlclRyYW5zbGF0ZVBpcGUgZXh0ZW5kcyBIeXBlclRyYW5zbGF0ZVBpcGVCYXNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3RyYW5zbGF0ZTogTmd4VHJhbnNsYXRvckltcGxTZXJ2aWNlLCBwcm90ZWN0ZWQgX3JlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==