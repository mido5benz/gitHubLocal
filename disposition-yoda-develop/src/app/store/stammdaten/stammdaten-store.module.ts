import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {MASTERDATA_FEATURE_KEY, masterdataReducer} from '@store/stammdaten/index';
import {StammdatenEffects} from '@store/stammdaten/effects/stammdaten.effects';
import {ZieleEffects} from '@store/stammdaten/effects/ziele.effects';
import {SuggestionsEffects} from '@store/stammdaten/effects/suggestions.effects';
import {AddressEffects} from '@store/stammdaten/effects/address-effects';
import {RestrictionsEffects} from '@store/stammdaten/effects/restrictions.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(MASTERDATA_FEATURE_KEY, masterdataReducer),
    EffectsModule.forFeature([StammdatenEffects, ZieleEffects, SuggestionsEffects, AddressEffects, RestrictionsEffects])
  ]
})
export class StammdatenStoreModule {
}
