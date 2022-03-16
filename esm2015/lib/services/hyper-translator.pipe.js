import { ChangeDetectorRef, Injectable, Pipe } from '@angular/core';
import { isObservable } from 'rxjs';
import { NgxTranslatorImplService } from './ngx-translator-impl.service';
import { equals, isDefined } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-translator-impl.service";
export class HyperTranslatePipe {
    constructor(translate, _ref) {
        this.translate = translate;
        this._ref = _ref;
        this.value = '';
        this.lastKey = null;
        this.lastParams = [];
    }
    updateValue(key, interpolateParams, translations) {
        let onTranslation = (res) => {
            this.value = res !== undefined ? res : key;
            this.lastKey = key;
            this._ref.markForCheck();
        };
        if (translations) {
            let res = this.translate.getParsedResult(translations, key, interpolateParams);
            if (isObservable(res.subscribe)) {
                res.subscribe(onTranslation);
            }
            else {
                onTranslation(res);
            }
        }
        this.translate.get(key, interpolateParams).subscribe(onTranslation);
    }
    transform(query, ...args) {
        if (!query || !query.length) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
            return this.value;
        }
        let interpolateParams = undefined;
        if (isDefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                let validArgs = args[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`);
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
            this.onTranslationChange = this.translate.onTranslationChange.subscribe((event) => {
                if (this.lastKey && event.lang === this.translate.currentLang) {
                    this.lastKey = null;
                    this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this.translate.onLangChange.subscribe((event) => {
                if (this.lastKey) {
                    this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChange) {
            this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(() => {
                if (this.lastKey) {
                    this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    this.updateValue(query, interpolateParams);
                }
            });
        }
        return this.value;
    }
    /**
     * Clean any existing subscription to change events
     */
    _dispose() {
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
    }
    ngOnDestroy() {
        this._dispose();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXItdHJhbnNsYXRvci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1pMThuLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2h5cGVyLXRyYW5zbGF0b3IucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFhLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7OztBQU81QyxNQUFNLE9BQU8sa0JBQWtCO0lBUTNCLFlBQW9CLFNBQW1DLEVBQVUsSUFBdUI7UUFBcEUsY0FBUyxHQUFULFNBQVMsQ0FBMEI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQVB4RixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBQzlCLGVBQVUsR0FBVSxFQUFFLENBQUM7SUFNdkIsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFXLEVBQUUsaUJBQTBCLEVBQUUsWUFBa0I7UUFDbkUsSUFBSSxhQUFhLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVB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QUFZLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxXQUFXLEVBQUU7WUFDakQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOzt1R0F6SFEsa0JBQWtCOzBGQUFsQixrQkFBa0I7NkVBQWxCLGtCQUFrQixXQUFsQixrQkFBa0I7a0RBQWxCLGtCQUFrQjtjQUw5QixVQUFVOztjQUNWLElBQUk7ZUFBQztnQkFDRixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyw0REFBNEQ7YUFDM0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRpb25DaGFuZ2VFdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvbmd4LXRyYW5zbGF0b3IuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTmd4VHJhbnNsYXRvckltcGxTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtdHJhbnNsYXRvci1pbXBsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBlcXVhbHMsIGlzRGVmaW5lZCB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnaHlwZXJUcmFucycsXHJcbiAgICBwdXJlOiBmYWxzZSAvLyByZXF1aXJlZCB0byB1cGRhdGUgdGhlIHZhbHVlIHdoZW4gdGhlIHByb21pc2UgaXMgcmVzb2x2ZWRcclxufSlcclxuZXhwb3J0IGNsYXNzIEh5cGVyVHJhbnNsYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XHJcbiAgICB2YWx1ZTogc3RyaW5nID0gJyc7XHJcbiAgICBsYXN0S2V5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICAgIGxhc3RQYXJhbXM6IGFueVtdID0gW107XHJcbiAgICBvblRyYW5zbGF0aW9uQ2hhbmdlOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XHJcbiAgICBvbkxhbmdDaGFuZ2U6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcclxuICAgIG9uRGVmYXVsdExhbmdDaGFuZ2U6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogTmd4VHJhbnNsYXRvckltcGxTZXJ2aWNlLCBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmFsdWUoa2V5OiBzdHJpbmcsIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0LCB0cmFuc2xhdGlvbnM/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgb25UcmFuc2xhdGlvbiA9IChyZXM6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzICE9PSB1bmRlZmluZWQgPyByZXMgOiBrZXk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdEtleSA9IGtleTtcclxuICAgICAgICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHRyYW5zbGF0aW9ucykge1xyXG4gICAgICAgICAgICBsZXQgcmVzID0gdGhpcy50cmFuc2xhdGUuZ2V0UGFyc2VkUmVzdWx0KHRyYW5zbGF0aW9ucywga2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIGlmIChpc09ic2VydmFibGUocmVzLnN1YnNjcmliZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdWJzY3JpYmUob25UcmFuc2xhdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvblRyYW5zbGF0aW9uKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGUuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpLnN1YnNjcmliZShvblRyYW5zbGF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0ocXVlcnk6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBhbnkge1xyXG4gICAgICAgIGlmICghcXVlcnkgfHwgIXF1ZXJ5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiB3ZSBhc2sgYW5vdGhlciB0aW1lIGZvciB0aGUgc2FtZSBrZXksIHJldHVybiB0aGUgbGFzdCB2YWx1ZVxyXG4gICAgICAgIGlmIChlcXVhbHMocXVlcnksIHRoaXMubGFzdEtleSkgJiYgZXF1YWxzKGFyZ3MsIHRoaXMubGFzdFBhcmFtcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW50ZXJwb2xhdGVQYXJhbXM6IE9iamVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoaXNEZWZpbmVkKGFyZ3NbMF0pICYmIGFyZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgJiYgYXJnc1swXS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIGFjY2VwdCBvYmplY3RzIHdyaXR0ZW4gaW4gdGhlIHRlbXBsYXRlIHN1Y2ggYXMge246MX0sIHsnbic6MX0sIHtuOid2J31cclxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIGlzIHdoeSB3ZSBtaWdodCBuZWVkIHRvIGNoYW5nZSBpdCB0byByZWFsIEpTT04gb2JqZWN0cyBzdWNoIGFzIHtcIm5cIjoxfSBvciB7XCJuXCI6XCJ2XCJ9XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRBcmdzOiBzdHJpbmcgPSBhcmdzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXCcpPyhbYS16QS1aMC05X10rKShcXCcpPyhcXHMpPzovZywgJ1wiJDJcIjonKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC86KFxccyk/KFxcJykoLio/KShcXCcpL2csICc6XCIkM1wiJyk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRlUGFyYW1zID0gSlNPTi5wYXJzZSh2YWxpZEFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgV3JvbmcgcGFyYW1ldGVyIGluIFRyYW5zbGF0ZVBpcGUuIEV4cGVjdGVkIGEgdmFsaWQgT2JqZWN0LCByZWNlaXZlZDogJHthcmdzWzBdfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzdG9yZSB0aGUgcXVlcnksIGluIGNhc2UgaXQgY2hhbmdlc1xyXG4gICAgICAgIHRoaXMubGFzdEtleSA9IHF1ZXJ5O1xyXG5cclxuICAgICAgICAvLyBzdG9yZSB0aGUgcGFyYW1zLCBpbiBjYXNlIHRoZXkgY2hhbmdlXHJcbiAgICAgICAgdGhpcy5sYXN0UGFyYW1zID0gYXJncztcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZVxyXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBzdWJzY3JpcHRpb24gdG8gb25MYW5nQ2hhbmdlLCBjbGVhbiBpdFxyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIG9uVHJhbnNsYXRpb25DaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIHRyYW5zbGF0aW9ucyBjaGFuZ2VcclxuICAgICAgICBpZiAoIXRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UgPSB0aGlzLnRyYW5zbGF0ZS5vblRyYW5zbGF0aW9uQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RLZXkgJiYgZXZlbnQubGFuZyA9PT0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBvbkxhbmdDaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIGxhbmd1YWdlIGNoYW5nZXNcclxuICAgICAgICBpZiAoIXRoaXMub25MYW5nQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25MYW5nQ2hhbmdlID0gdGhpcy50cmFuc2xhdGUub25MYW5nQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IExhbmdDaGFuZ2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEtleSA9IG51bGw7IC8vIHdlIHdhbnQgdG8gbWFrZSBzdXJlIGl0IGRvZXNuJ3QgcmV0dXJuIHRoZSBzYW1lIHZhbHVlIHVudGlsIGl0J3MgYmVlbiB1cGRhdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShxdWVyeSwgaW50ZXJwb2xhdGVQYXJhbXMsIGV2ZW50LnRyYW5zbGF0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIG9uRGVmYXVsdExhbmdDaGFuZ2UgZXZlbnQsIGluIGNhc2UgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgY2hhbmdlc1xyXG4gICAgICAgIGlmICghdGhpcy5vbkRlZmF1bHRMYW5nQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHRoaXMudHJhbnNsYXRlLm9uRGVmYXVsdExhbmdDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsOyAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSB1bnRpbCBpdCdzIGJlZW4gdXBkYXRlZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFuIGFueSBleGlzdGluZyBzdWJzY3JpcHRpb24gdG8gY2hhbmdlIGV2ZW50c1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLm9uVHJhbnNsYXRpb25DaGFuZ2UudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub25MYW5nQ2hhbmdlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLm9uTGFuZ0NoYW5nZS51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uTGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZS51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG4iXX0=