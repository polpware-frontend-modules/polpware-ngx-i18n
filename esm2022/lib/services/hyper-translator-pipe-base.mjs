import { Pipe } from '@angular/core';
import { isObservable } from 'rxjs';
import { equals, isDefined } from './utils';
import * as i0 from "@angular/core";
// TODO: Add Angular decorator.
export class HyperTranslatePipeBase {
    constructor() {
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
            let res = this._translate.getParsedResult(translations, key, interpolateParams);
            if (isObservable(res.subscribe)) {
                res.subscribe(onTranslation);
            }
            else {
                onTranslation(res);
            }
        }
        this._translate.get(key, interpolateParams).subscribe(onTranslation);
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
            this.onTranslationChange = this._translate.onTranslationChange.subscribe((event) => {
                if (this.lastKey && event.lang === this._translate.currentLang) {
                    this.lastKey = null;
                    this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this._translate.onLangChange.subscribe((event) => {
                if (this.lastKey) {
                    this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChange) {
            this.onDefaultLangChange = this._translate.onDefaultLangChange.subscribe(() => {
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
    /** @nocollapse */ static { this.ɵfac = function HyperTranslatePipeBase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HyperTranslatePipeBase)(); }; }
    /** @nocollapse */ static { this.ɵpipe = /** @pureOrBreakMyCode */ i0.ɵɵdefinePipe({ name: "hyperTransBase", type: HyperTranslatePipeBase, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HyperTranslatePipeBase, [{
        type: Pipe,
        args: [{
                name: "hyperTransBase"
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXItdHJhbnNsYXRvci1waXBlLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wb2xwd2FyZS9uZ3gtaTE4bi9zcmMvbGliL3NlcnZpY2VzL2h5cGVyLXRyYW5zbGF0b3ItcGlwZS1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUQsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsWUFBWSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFFNUMsK0JBQStCO0FBSS9CLE1BQU0sT0FBZ0Isc0JBQXNCO0lBSDVDO1FBSUksVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixZQUFPLEdBQWtCLElBQUksQ0FBQztRQUM5QixlQUFVLEdBQVUsRUFBRSxDQUFDO0tBdUgxQjtJQS9HRyxXQUFXLENBQUMsR0FBVyxFQUFFLGlCQUEwQixFQUFFLFlBQWtCO1FBQ25FLElBQUksYUFBYSxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQztRQUNGLElBQUksWUFBWSxFQUFFLENBQUM7WUFDZixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDaEYsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7Z0JBQzlCLEdBQUcs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QUFLLFdBQVcsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksT0FBTyxJQUFJLENBQUMsbUJBQW1CLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7UUFDekMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7MElBekhpQixzQkFBc0I7dUhBQXRCLHNCQUFzQjs7aUZBQXRCLHNCQUFzQjtjQUgzQyxJQUFJO2VBQUM7Z0JBQ0YsSUFBSSxFQUFFLGdCQUFnQjthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEluamVjdGFibGUsIE9uRGVzdHJveSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElOZ3hUcmFuc2xhdG9yLCBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0aW9uQ2hhbmdlRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL25neC10cmFuc2xhdG9yLmludGVyZmFjZSc7XG5pbXBvcnQgeyBlcXVhbHMsIGlzRGVmaW5lZCB9IGZyb20gJy4vdXRpbHMnO1xuXG4vLyBUT0RPOiBBZGQgQW5ndWxhciBkZWNvcmF0b3IuXG5AUGlwZSh7XG4gICAgbmFtZTogXCJoeXBlclRyYW5zQmFzZVwiXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh5cGVyVHJhbnNsYXRlUGlwZUJhc2UgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtLCBPbkRlc3Ryb3kge1xuICAgIHZhbHVlOiBzdHJpbmcgPSAnJztcbiAgICBsYXN0S2V5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBsYXN0UGFyYW1zOiBhbnlbXSA9IFtdO1xuICAgIG9uVHJhbnNsYXRpb25DaGFuZ2U6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgICBvbkxhbmdDaGFuZ2U6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgICBvbkRlZmF1bHRMYW5nQ2hhbmdlOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG5cbiAgICBwcm90ZWN0ZWQgX3RyYW5zbGF0ZTogSU5neFRyYW5zbGF0b3I7XG4gICAgcHJvdGVjdGVkIF9yZWY6IENoYW5nZURldGVjdG9yUmVmO1xuXG4gICAgdXBkYXRlVmFsdWUoa2V5OiBzdHJpbmcsIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0LCB0cmFuc2xhdGlvbnM/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IG9uVHJhbnNsYXRpb24gPSAocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSByZXMgIT09IHVuZGVmaW5lZCA/IHJlcyA6IGtleTtcbiAgICAgICAgICAgIHRoaXMubGFzdEtleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXMuX3JlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRyYW5zbGF0aW9ucykge1xuICAgICAgICAgICAgbGV0IHJlcyA9IHRoaXMuX3RyYW5zbGF0ZS5nZXRQYXJzZWRSZXN1bHQodHJhbnNsYXRpb25zLCBrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICAgICAgICAgIGlmIChpc09ic2VydmFibGUocmVzLnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgICAgICByZXMuc3Vic2NyaWJlKG9uVHJhbnNsYXRpb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvblRyYW5zbGF0aW9uKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlLmdldChrZXksIGludGVycG9sYXRlUGFyYW1zKS5zdWJzY3JpYmUob25UcmFuc2xhdGlvbik7XG4gICAgfVxuXG4gICAgdHJhbnNmb3JtKHF1ZXJ5OiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICAgICAgaWYgKCFxdWVyeSB8fCAhcXVlcnkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBhc2sgYW5vdGhlciB0aW1lIGZvciB0aGUgc2FtZSBrZXksIHJldHVybiB0aGUgbGFzdCB2YWx1ZVxuICAgICAgICBpZiAoZXF1YWxzKHF1ZXJ5LCB0aGlzLmxhc3RLZXkpICYmIGVxdWFscyhhcmdzLCB0aGlzLmxhc3RQYXJhbXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbnRlcnBvbGF0ZVBhcmFtczogT2JqZWN0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoaXNEZWZpbmVkKGFyZ3NbMF0pICYmIGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnICYmIGFyZ3NbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gd2UgYWNjZXB0IG9iamVjdHMgd3JpdHRlbiBpbiB0aGUgdGVtcGxhdGUgc3VjaCBhcyB7bjoxfSwgeyduJzoxfSwge246J3YnfVxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIGlzIHdoeSB3ZSBtaWdodCBuZWVkIHRvIGNoYW5nZSBpdCB0byByZWFsIEpTT04gb2JqZWN0cyBzdWNoIGFzIHtcIm5cIjoxfSBvciB7XCJuXCI6XCJ2XCJ9XG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkQXJnczogc3RyaW5nID0gYXJnc1swXVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFxcJyk/KFthLXpBLVowLTlfXSspKFxcJyk/KFxccyk/Oi9nLCAnXCIkMlwiOicpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC86KFxccyk/KFxcJykoLio/KShcXCcpL2csICc6XCIkM1wiJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJwb2xhdGVQYXJhbXMgPSBKU09OLnBhcnNlKHZhbGlkQXJncyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFdyb25nIHBhcmFtZXRlciBpbiBUcmFuc2xhdGVQaXBlLiBFeHBlY3RlZCBhIHZhbGlkIE9iamVjdCwgcmVjZWl2ZWQ6ICR7YXJnc1swXX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgICAgICAgICAgIGludGVycG9sYXRlUGFyYW1zID0gYXJnc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBxdWVyeSwgaW4gY2FzZSBpdCBjaGFuZ2VzXG4gICAgICAgIHRoaXMubGFzdEtleSA9IHF1ZXJ5O1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBwYXJhbXMsIGluIGNhc2UgdGhleSBjaGFuZ2VcbiAgICAgICAgdGhpcy5sYXN0UGFyYW1zID0gYXJncztcblxuICAgICAgICAvLyBzZXQgdGhlIHZhbHVlXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zKTtcblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIHN1YnNjcmlwdGlvbiB0byBvbkxhbmdDaGFuZ2UsIGNsZWFuIGl0XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gb25UcmFuc2xhdGlvbkNoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgdHJhbnNsYXRpb25zIGNoYW5nZVxuICAgICAgICBpZiAoIXRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlID0gdGhpcy5fdHJhbnNsYXRlLm9uVHJhbnNsYXRpb25DaGFuZ2Uuc3Vic2NyaWJlKChldmVudDogVHJhbnNsYXRpb25DaGFuZ2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RLZXkgJiYgZXZlbnQubGFuZyA9PT0gdGhpcy5fdHJhbnNsYXRlLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEtleSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUocXVlcnksIGludGVycG9sYXRlUGFyYW1zLCBldmVudC50cmFuc2xhdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIG9uTGFuZ0NoYW5nZSBldmVudCwgaW4gY2FzZSB0aGUgbGFuZ3VhZ2UgY2hhbmdlc1xuICAgICAgICBpZiAoIXRoaXMub25MYW5nQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLm9uTGFuZ0NoYW5nZSA9IHRoaXMuX3RyYW5zbGF0ZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChldmVudDogTGFuZ0NoYW5nZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsOyAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSB1bnRpbCBpdCdzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHF1ZXJ5LCBpbnRlcnBvbGF0ZVBhcmFtcywgZXZlbnQudHJhbnNsYXRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBvbkRlZmF1bHRMYW5nQ2hhbmdlIGV2ZW50LCBpbiBjYXNlIHRoZSBkZWZhdWx0IGxhbmd1YWdlIGNoYW5nZXNcbiAgICAgICAgaWYgKCF0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHRoaXMuX3RyYW5zbGF0ZS5vbkRlZmF1bHRMYW5nQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RLZXkgPSBudWxsOyAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSB1bnRpbCBpdCdzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHF1ZXJ5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhbiBhbnkgZXhpc3Rpbmcgc3Vic2NyaXB0aW9uIHRvIGNoYW5nZSBldmVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIF9kaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMub25UcmFuc2xhdGlvbkNoYW5nZS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vblRyYW5zbGF0aW9uQ2hhbmdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vbkxhbmdDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLm9uTGFuZ0NoYW5nZS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkxhbmdDaGFuZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLm9uRGVmYXVsdExhbmdDaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMub25EZWZhdWx0TGFuZ0NoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kaXNwb3NlKCk7XG4gICAgfVxufVxuIl19