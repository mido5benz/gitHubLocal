import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ManualDispoStoreModule} from './manual-dispo/manual-dispo-store.module';
import {StammdatenStoreModule} from './stammdaten/stammdaten-store.module';
import {UIStoreModule} from './ui/ui-store.module';
import {StrategicDispoStoreModule} from '@store/strategic-dispo/strategic-dispo-store.module';
import {OnTourStoreModule} from './on-tour/on-tour-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UIStoreModule,
    StrategicDispoStoreModule,
    ManualDispoStoreModule,
    StammdatenStoreModule,
    OnTourStoreModule,
    StoreModule.forRoot({}, {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule {
}
