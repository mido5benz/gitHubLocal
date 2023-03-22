import {Component, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import { LayerService } from '@app/core/services';
import { PalletService } from '@app/core/services/pallet/pallet.service';
import { Pallet } from '@models/strategic-dispo/pallet.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MapService } from '../map.service';
import { ActiveLayerFacade } from '@store/strategic-dispo/facades/activate-layer.facade';

@Component({
  templateUrl: 'pallet-control.component.html',
  styleUrls: ['./pallet-control.component.scss']
})
export class PalletControlComponent implements OnInit, OnDestroy {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private palletService: PalletService,
    private layerService: LayerService,
    private spinner: NgxSpinnerService,
    public mapService: MapService,
    private activeLayerFacade: ActiveLayerFacade
  ) {
  }

  public pallets: Pallet[] = [];
  public palletCount: number;

  public showList: Observable<boolean>;
  public show: boolean;
  public loading = false;

  ngOnInit(): void {
    this.pallets = [];
    this.mapService.showPalletControl.subscribe((result: boolean) => {
      this.show = result;
      this.changeDetectorRef.detectChanges();
    });
    this.showList = this.mapService.showPalletControl;
    this.spinner.show();
    this.palletService.dataChanged.subscribe((layer) => {
      this.loading = true;
      if (layer === 'sattel') {
        this.pallets = this.palletService.grosspostenSattel;
      }

      if (layer === 'lkw') {
        this.pallets = this.palletService.grosspostenLkw;
      }
      this.changeDetectorRef.detectChanges();
    });


    this.activeLayerFacade.activeLayer$.subscribe((layer: string) => {
      this.loading = true;
      this.spinner.show();
      if (layer === 'sattel') {
        this.pallets = this.palletService.grosspostenSattel;
        this.palletService.getGrossposten(layer.toUpperCase()).subscribe((result: Pallet[]) => {
          this.palletCount = result.length;
          this.loading = false;
          this.changeDetectorRef.detectChanges();
        });
      }
      if (layer === 'lkw') {
        this.pallets = this.palletService.grosspostenLkw;
        this.palletService.getGrossposten(layer.toUpperCase()).subscribe((result: Pallet[]) => {
          this.palletCount = result.length;
          this.loading = false;
          this.changeDetectorRef.detectChanges();
        });
      }
    });
  }

  public open(): void {
    this.mapService.showPalletControl.next(true);
  }

  public close(): void {
    this.mapService.showPalletControl.next(false);
  }

  selectEmpfaenger(pallet: Pallet): void {
    this.palletService.currentEmpfaenger.next(pallet);
  }

  ngOnDestroy(): void {
    this.changeDetectorRef.detach();
  }
}
