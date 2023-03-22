import {NgModule} from '@angular/core';
import {LocationsEffects} from '@store/manual-dispo/locations/effects/locations.effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {FilterEffects} from './map/effects/map-filter.effects';
import {MoveStoppEffects} from './stopps/effects/move-stopp.effects';
import {TourlistEffects} from './tour/effects/tour-list.effects';
import {manualDispoReducer} from './index';
import {ManualDispoStoreKey} from './manual-dispo.state';
import {ReloadLineEffects} from '@store/manual-dispo/tour/effects/reloadline.effects';
import {ActivateManualDispoEffects} from '@store/manual-dispo/activate-dispo/effects/activate-manual-dispo.effects';
import {TagesabschlussEffects} from '@store/manual-dispo/daily-closing/effects/daily-closing.effects';
import {SelectedTourEffects} from '@store/manual-dispo/tour/effects/selected-tour.effects';
import {ChangeStoppsOrderEffects} from '@store/manual-dispo/tour/effects/change-stopps-order.effects';
import {MoveConsignmentEffects} from '@store/manual-dispo/consignments/effects/move-consignment.effects';
import {SendungEffects} from '@store/manual-dispo/consignments/effects/fetch-consignments.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(ManualDispoStoreKey, manualDispoReducer),
    EffectsModule.forFeature(
      [
        LocationsEffects,
        MoveStoppEffects,
        TourlistEffects,
        FilterEffects,
        ReloadLineEffects,
        ActivateManualDispoEffects,
        TagesabschlussEffects,
        SelectedTourEffects,
        ChangeStoppsOrderEffects,
        MoveConsignmentEffects,
        SendungEffects
      ])
  ]
})
export class ManualDispoStoreModule {
}
