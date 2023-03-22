import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {uiReducers} from './index';
import {UiStoreKey} from './ui.state';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(UiStoreKey, uiReducers),
    ]
})
export class UIStoreModule { }
