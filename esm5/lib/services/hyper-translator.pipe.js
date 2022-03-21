import { ChangeDetectorRef, Injectable, Pipe } from '@angular/core';
import { isObservable } from 'rxjs';
import { NgxTranslatorImplService } from './ngx-translator-impl.service';
import { equals, isDefined, lookupDeeply } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-translator-impl.service";
var HyperTranslatePipe = /** @class */ (function () {
    function HyperTranslatePipe(translate, _ref) {
        this.translate = translate;
        this._ref = _ref;
        this.value = '';
        this.lastKey = null;
        this.lastParams = [];
    }
    HyperTranslatePipe.prototype.updateValue = function (key, interpolateParams, translations) {
        var _this = this;
        var onTranslation = function (res) {
            _this.value = res !== undefined ? res : key;
            _this.lastKey = key;
            _this._ref.markForCheck();
        };
        if (translations) {
            var res = this.translate.getParsedResult(translations, key, interpolateParams);
            if (isObservable(res.subscribe)) {
                res.subscribe(onTranslation);
            }
            else {
                onTranslation(res);
            }
        }
        this.translate.get(key, interpolateParams).subscribe(onTranslation);
    };
    HyperTranslatePipe.prototype.transform = function (query) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!query || !query.length) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
            return this.value;
        }
        var interpolateParams = undefined;
        if (isDefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                var validArgs = args[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        // store the query, in case it changes
        this.lastKey = query;
        // store the params, in case they change
        this.lastParams = args;
        // set the value
        this.updateValue(query, interpolateParams);
        // if there is a subscription to onLangChange, clean it
        this._dispose();
        // subscribe to onTranslationChange event, in case the translations change
        if (!this.onTranslationChange) {
            this.onTranslationChange = this.translate.onTranslationChange.subscribe(function (event) {
                if (_this.lastKey && event.lang === _this.translate.currentLang) {
                    _this.lastKey = null;
                    _this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this.translate.onLangChange.subscribe(function (event) {
                if (_this.lastKey) {
                    _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    _this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChange) {
            this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(function () {
                if (_this.lastKey) {
                    _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    _this.updateValue(query, interpolateParams);
                }
            });
        }
        if (this.value == query) {
            if (args.length > 2 && isDefined(args[2]) && typeof args[2] === 'object') {
                var defaultResources = args[2];
                // Update it
                var anotherTry = lookupDeeply(defaultResources, query, interpolateParams);
                if (anotherTry) {
                    this.value = anotherTry;
                }
            }
        }
        return this.value;
    };
    /**
     * Clean any existing subscription to change events
     */
    HyperTranslatePipe.prototype._dispose = function () {
        if (typeof this.onTranslationChange !== 'undefined') {
            this.onTranslationChange.unsubscribe();
            this.onTranslationChange = undefined;
        }
        if (typeof this.onLangChange !== 'undefined') {
            this.onLangChange.unsubscribe();
            this.onLangChange = undefined;
        }
        if (typeof this.onDefaultLangChange !== 'undefined') {
            this.onDefaultLangChange.unsubscribe();
            this.onDefaultLangChange = undefined;
        }
    };
    HyperTranslatePipe.prototype.ngOnDestroy = function () {
        this._dispose();
    };
    /** @nocollapse */ HyperTranslatePipe.ɵfac = function HyperTranslatePipe_Factory(t) { return new (t || HyperTranslatePipe)(i0.ɵɵdirectiveInject(i1.NgxTranslatorImplService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    /** @nocollapse */ HyperTranslatePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "hyperTrans", type: HyperTranslatePipe, pure: false });
    /** @nocollapse */ HyperTranslatePipe.ɵprov = i0.ɵɵdefineInjectable({ token: HyperTranslatePipe, factory: HyperTranslatePipe.ɵfac });
    return HyperTranslatePipe;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXItdHJhbnNsYXRvci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1pMThuLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2h5cGVyLXRyYW5zbGF0b3IucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFhLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7QUFFMUQ7SUFhSSw0QkFBb0IsU0FBbUMsRUFBVSxJQUF1QjtRQUFwRSxjQUFTLEdBQVQsU0FBUyxDQUEwQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQW1CO1FBUHhGLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsWUFBTyxHQUFrQixJQUFJLENBQUM7UUFDOUIsZUFBVSxHQUFVLEVBQUUsQ0FBQztJQU12QixDQUFDO0lBRUQsd0NBQVcsR0FBWCxVQUFZLEdBQVcsRUFBRSxpQkFBMEIsRUFBRSxZQUFrQjtRQUF2RSxpQkFlQztRQWRHLElBQUksYUFBYSxHQUFHLFVBQUMsR0FBVztZQUM1QixLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVB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LGlCQUFpQixDQUFDLENBQUM7Z0JBQzVFLElBQUksVUFBVSxFQUFFO29CQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO2lCQUMzQjthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0sscUNBQVEsR0FBaEI7UUFDSSxJQUFJLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixLQUFLLFdBQVcsRUFBRTtZQUNqRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztTQUN4QztRQUNELElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFdBQVcsRUFBRTtZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxXQUFXLEVBQUU7WUFDakQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOzJHQXBJUSxrQkFBa0I7OEZBQWxCLGtCQUFrQjtpRkFBbEIsa0JBQWtCLFdBQWxCLGtCQUFrQjs2QkFYL0I7Q0FnSkMsQUExSUQsSUEwSUM7U0FySVksa0JBQWtCO2tEQUFsQixrQkFBa0I7Y0FMOUIsVUFBVTs7Y0FDVixJQUFJO2VBQUM7Z0JBQ0YsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLElBQUksRUFBRSxLQUFLLENBQUMsNERBQTREO2FBQzNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdGFibGUsIE9uRGVzdHJveSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL25neC10cmFuc2xhdG9yLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE5neFRyYW5zbGF0b3JJbXBsU2VydmljZSB9IGZyb20gJy4vbmd4LXRyYW5zbGF0b3ItaW1wbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZXF1YWxzLCBpc0RlZmluZWQsIGxvb2t1cERlZXBseSB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnaHlwZXJUcmFucycsXHJcbiAgICBwdXJlOiBmYWxzZSAvLyByZXF1aXJlZCB0byB1cGRhdGUgdGhlIHZhbHVlIHdoZW4gdGhlIHByb21pc2UgaXMgcmVzb2x2ZWRcclxufSlcclxuZXhwb3J0IGNsYXNzIEh5cGVyVHJhbnNsYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XHJcbiAgICB2YWx1ZTogc3RyaW5nID0gJyc7XHJcbiAgICBsYXN0S2V5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICAgIGxhc3RQYXJhbXM6IGFueVtdID0gW107XHJcbiAgICBvblRyYW5zbGF0aW9uQ2hhbmdlOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XHJcbiAgICBvbkxhbmdDaGFuZ2U6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcclxuICAgIG9uRGVmYXVsdExhbmdDaGFuZ2U6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogTmd4VHJhbnNsYXRvckltcGxTZXJ2aWNlLCBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmFsdWUoa2V5OiBzdHJpbmcsIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0LCB0cmFuc2xhdGlvbnM/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgb25UcmFuc2xhdGlvbiA9IChyZXM6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzICE9PSB1bmRlZmluZWQgPyByZXMgOiBrZXk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdEtleSA9IGtleTtcclxuICAgICAgICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHRyYW5zbGF0aW9ucykge1xyXG4gICAgICAgICAgICBsZXQgcmVzID0gdGhpcy50cmFuc2xhdGUuZ2V0UGFyc2VkUmVzdWx0KHRyYW5zbGF0aW9ucywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIGlmIChpc09ic2VydmFibGUocmVzLnN1YnNjcmliZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdWJzY3JpYmUob25UcmFuc2xhdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvblRyYW5zbGF0aW9uKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGUuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0ocXVlcnk6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBhbnkge1xyXG4gICAgICAgIGlmICghcXVlcnkgfHwgIXF1ZXJ5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiB3ZSBhc2sgYW5vdGhlciB0aW1lIGZvciB0aGUgc2FtZSBrZXksIHJldHVybiB0aGUgbGFzdCB2YWx1ZVxyXG4gICAgICAgIGlmIChlcXVhbHMocXVlcnksIHRoaXMubGFzdEtleSkgJiYgZXF1YWxzKGFyZ3MsIHRoaXMubGFzdFBhcmFtcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW50ZXJwb2xhdGVQYXJhbXM6IE9iamVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoaXNEZWZpbmVkKGFyZ3NbMF0pICYmIGFyZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgJiYgYXJnc1swXS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIGFjY2VwdCBvYmplY3RzIHdyaXR0ZW4gaW4gdGhlIHRlbXBsYXRlIHN1Y2ggYXMge246MX0sIHsnbic6MX0sIHtuOid2J31cclxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIGlzIHdoeSB3ZSBtaWdodCBuZWVkIHRvIGNoYW5nZSBpdCB0byByZWFsIEpTT04gb2JqZWN0cyBzdWNoIGFzIHtcIm5cIjoxfSBvciB7XCJuXCI6XCJ2XCJ9XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRBcmdzOiBzdHJpbmcgPSBhcmdzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXCcpPyhbYS16QS1aMC05X10rKShcXCcpPyhcXHMpPzovZywgJ1wiJDJcIjonKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC86KFxccyk/KFxcJykoLio/KShcXCcpL2csICc6XCIkM1wiJyk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRlUGFyYW1zID0gSlNPTi5wYXJzZSh2YWxpZEFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgV3JvbmcgcGFyYW1ldGVyIGluIFRyYW5zbGF0ZVBpcGUuIEV4cGVjdGVkIGEgdmFsaWQgT2JqZWN0LCByZWNlaXZlZDogJHthcmdzWzBdfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzdG9yZSB0aGUgcXVlcnksIGluIGNhc2UgaXQgY2hhbmdlc1xyXG4gICAgICAgIHRoaXMubGFzdEtleSA9IHF1ZXJ5O1xyXG5cclxuICAgICAgICAvLyBzdG9yZSB0aGUgcGFyYW1zLCBpbiBjYXNlIHRoZXkgY2hhbmdlXHJcbiAgICAgICAgdGhpcy5sYXN0UGFyYW1zID0gYXJncztcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZVxyXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBzdWJzY3JpcHRpb24gdG8gb25MYW5nQ2hhbmdlLCBjbGVhbiBpdFxyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIG9uVHJhbnNsYXRpb25DaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIHRyYW5zbGF0aW9ucyBjaGFuZ2VcclxuICAgICAgICBpZiAoIXRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UgPSB0aGlzLnRyYW5zbGF0ZS5vblRyYW5zbGF0aW9uQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RLZXkgJiYgZXZlbnQubGFuZyA9PT0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBvbkxhbmdDaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIGxhbmd1YWdlIGNoYW5nZXNcclxuICAgICAgICBpZiAoIXRoaXMub25MYW5nQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25MYW5nQ2hhbmdlID0gdGhpcy50cmFuc2xhdGUub25MYW5nQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IExhbmdDaGFuZ2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEtleSA9IG51bGw7IC8vIHdlIHdhbnQgdG8gbWFrZSBzdXJlIGl0IGRvZXNuJ3QgcmV0dXJuIHRoZSBzYW1lIHZhbHVlIHVudGlsIGl0J3MgYmVlbiB1cGRhdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShxdWVyeSwgaW50ZXJwb2xhdGVQYXJhbXMsIGV2ZW50LnRyYW5zbGF0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIG9uRGVmYXVsdExhbmdDaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgY2hhbmdlc1xyXG4gICAgICAgIGlmICghdGhpcy5vbkRlZmF1bHRMYW5nQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHRoaXMudHJhbnNsYXRlLm9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsOyAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSB1bnRpbCBpdCdzIGJlZW4gdXBkYXRlZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PSBxdWVyeSkge1xyXG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAyICYmIGlzRGVmaW5lZChhcmdzWzJdKSAmJiB0eXBlb2YgYXJnc1syXSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRSZXNvdXJjZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSBhcmdzWzJdO1xyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGl0XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbm90aGVyVHJ5ID0gbG9va3VwRGVlcGx5KGRlZmF1bHRSZXNvdXJjZXMsIHF1ZXJ5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5vdGhlclRyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBhbm90aGVyVHJ5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFuIGFueSBleGlzdGluZyBzdWJzY3JpcHRpb24gdG8gY2hhbmdlIGV2ZW50c1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub25MYW5nQ2hhbmdlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLm9uTGFuZ0NoYW5nZS51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uTGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZS51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG4iXX0=