import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import { onTourReducer } from '.';
import {EffectsModule} from '@ngrx/effects';
import {OnTourEffects} from '@store/on-tour/effects/on-tour.effects';

export const ONTOUR_FEATURE_KEY = 'onTour';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(ONTOUR_FEATURE_KEY, onTourReducer),
    EffectsModule.forFeature([OnTourEffects])
  ]
})
export class OnTourStoreModule {
}
