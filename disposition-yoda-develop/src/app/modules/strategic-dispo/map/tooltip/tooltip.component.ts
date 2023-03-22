import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PalletService} from '@app/core/services/pallet/pallet.service';
import {RasterService} from '@app/core/services/raster/raster.service';
import {Pallet} from '@models/strategic-dispo/pallet.model';
import {Feature} from 'geojson';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {StammdatenService} from '@app/core/services';
import {Wochentag} from '@shared/models';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit, OnDestroy {
  @Input() feature: Feature;
  @Input() layer: L.GeoJSON;
  @Input() currentLayer: string;
  @Input() rasterId: number;
  @Input() tourNr: string;
  public loading = true;
  private rasterDetails: any;
  public intAnzahlStopps = 0;
  public intGesamtmenge = 0;
  public intCollo = 0;
  public intPalette = 0;
  public intGesamtgewicht = 0;
  public intPlus8 = 0;
  public intPlus9 = 0;
  public intFrueh = 0;
  public intVormittag = 0;
  public intAbend = 0;
  public intAmb = 0;
  public intKuehlraum = 0;
  public intRadioaktiv = 0;
  public namenEmpfaenger = '';

  public wochenTagFilter: Wochentag = null;

  private subscription: Subscription = new Subscription();

  constructor(
    private stammDatenService: StammdatenService,
    private palletService: PalletService,
    private rasterService: RasterService,
    private cd: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.stammDatenService.wochentag$.subscribe((wochentag: Wochentag) => {
      if (wochentag) {
        this.wochenTagFilter = wochentag;
      }
    });
    this.spinner.show();
    this.getRasterDetails();
  }

  private getTooltipData(): void {
    let tag;
    let length = 0;
    if (!this.wochenTagFilter) {
      for (tag = 1; tag < 7; tag++) {
        if (
          this.rasterDetails[tag] !== undefined &&
          this.rasterDetails !== null
        ) {
          this.intAnzahlStopps += this.rasterDetails[tag]?.anzahl_stopps;
          this.intGesamtmenge += this.rasterDetails[tag]?.gesamtmenge;
          this.intCollo += this.rasterDetails[tag]?.anzahl_col;
          this.intPalette += this.rasterDetails[tag]?.anzahl_pal;
          this.intGesamtgewicht += this.rasterDetails[tag]?.gesamtgewicht;
          this.intPlus8 += this.rasterDetails[tag]?.plus8;
          this.intPlus9 += this.rasterDetails[tag]?.plus9;
          this.intFrueh += this.rasterDetails[tag]?.frueh;
          this.intVormittag += this.rasterDetails[tag]?.vormittag;
          this.intAbend += this.rasterDetails[tag]?.abend;
          this.intAmb += this.rasterDetails[tag]?.amb;
          this.intKuehlraum += this.rasterDetails[tag]?.kuehl_raum;
          this.intRadioaktiv += this.rasterDetails[tag]?.teilmenge_radioaktiv;
          length++;
        }
      }
      this.intAnzahlStopps = Math.ceil(this.intAnzahlStopps / length);
      this.intGesamtmenge = Math.ceil(this.intGesamtmenge / length);
      this.intCollo = Math.ceil(this.intCollo / length);
      this.intPalette = Math.ceil(this.intPalette / length);
      this.intGesamtgewicht = this.intGesamtgewicht / length;
      this.intGesamtgewicht = parseFloat(this.intGesamtgewicht.toFixed(2));
      this.intPlus8 = Math.ceil(this.intPlus8 / length);
      this.intPlus9 = Math.ceil(this.intPlus9 / length);
      this.intFrueh = Math.ceil(this.intFrueh / length);
      this.intVormittag = Math.ceil(this.intVormittag / length);
      this.intAbend = Math.ceil(this.intAbend / length);
      this.intAmb = Math.ceil(this.intAmb / length);
      this.intKuehlraum = Math.ceil(this.intKuehlraum / length);
      this.intRadioaktiv = Math.ceil(this.intRadioaktiv / length);

    } else {
      this.intAnzahlStopps += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.anzahl_stopps ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.anzahl_stopps : 0;
      this.intGesamtmenge += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.gesamtmenge ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.gesamtmenge : 0;
      this.intCollo += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.anzahl_col ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.anzahl_col : 0;
      this.intPalette += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.anzahl_pal ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.anzahl_pal : 0;
      this.intGesamtgewicht += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.gesamtgewicht ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.gesamtgewicht : 0;
      this.intPlus8 += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.plus8 ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.plus8 : 0;
      this.intPlus9 += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.plus9 ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.plus9 : 0;
      this.intFrueh += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.frueh ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.frueh : 0;
      this.intVormittag += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.vormittag ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.vormittag : 0;
      this.intAbend += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.abend ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.abend : 0;
      this.intAmb += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.amb ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.amb : 0;
      this.intKuehlraum += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.kuehl_raum ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.kuehl_raum : 0;
      this.intRadioaktiv += this.rasterDetails[this.wochenTagFilter.wochentag_id]?.teilmenge_radioaktiv ? this.rasterDetails[this.wochenTagFilter.wochentag_id]?.teilmenge_radioaktiv : 0;


      this.intAnzahlStopps = Math.ceil(this.intAnzahlStopps);
      this.intGesamtmenge = Math.ceil(this.intGesamtmenge);
      this.intCollo = Math.ceil(this.intCollo);
      this.intPalette = Math.ceil(this.intPalette);
      this.intGesamtgewicht = this.intGesamtgewicht;
      this.intGesamtgewicht = parseFloat(this.intGesamtgewicht.toFixed(2));
      this.intPlus8 = Math.ceil(this.intPlus8);
      this.intPlus9 = Math.ceil(this.intPlus9);
      this.intFrueh = Math.ceil(this.intFrueh);
      this.intVormittag = Math.ceil(this.intVormittag);
      this.intAbend = Math.ceil(this.intAbend);
      this.intAmb = Math.ceil(this.intAmb);
      this.intKuehlraum = Math.ceil(this.intKuehlraum);
      this.intRadioaktiv = Math.ceil(this.intRadioaktiv);
    }
  }


  private getRasterDetails(): void {
    if (this.currentLayer === 'sattel') {
      this.subscription.add(
        this.palletService
          .getGrossposten('SATTEL')
          .subscribe((result: Pallet[]) => {
            const grosspostenSattel: Pallet[] = result;
            const rasterSattel = this.rasterService.getRasterByCoordinate(
              this.feature.properties.position,
              this.currentLayer
            );
            if (rasterSattel !== undefined && rasterSattel !== null) {
              this.rasterDetails = rasterSattel.details;
              grosspostenSattel.forEach((value: Pallet) => {
                if (
                  this.feature.properties.raster.id &&
                  this.feature.properties.raster.id === value.georaster_id
                ) {
                  value.empfaenger.forEach((einEmpfaenger: any) => {
                    this.namenEmpfaenger += einEmpfaenger.name1 + '<br>';
                  });
                }
              });
              this.getTooltipData();
              this.loading = false;
              this.cd.detectChanges();
            }
          })
      );
    }

    if (this.currentLayer === 'lkw') {
      this.subscription.add(this.palletService.getGrossposten('LKW').subscribe((result: Pallet[]) => {
        const grosspostenlkw: Pallet[] = result;
        const rasterlkw = this.rasterService.getRasterByCoordinate(
          this.feature.properties.position,
          this.currentLayer
        );
        if (rasterlkw !== undefined && rasterlkw !== null) {
          this.rasterDetails = rasterlkw.details;
          grosspostenlkw.forEach((value: Pallet) => {
            if (
              this.feature.properties.raster.id &&
              this.feature.properties.raster.id === value.georaster_id
            ) {
              value.empfaenger.forEach((einEmpfaenger: any) => {
                this.namenEmpfaenger += einEmpfaenger.name1;
              });
            }
          });
          this.getTooltipData();
          this.loading = false;
          this.cd.detectChanges();
        }
      }));
    }

    if (this.currentLayer === 'express') {
      const rasterExpress = this.rasterService.getRasterByCoordinate(
        this.feature.properties.position,
        this.currentLayer
      );
      if (rasterExpress !== undefined && rasterExpress !== null) {
        this.rasterDetails = rasterExpress.details;
        this.getTooltipData();
        this.loading = false;
      }
    }

    if (this.currentLayer === 'regel') {
      const rasterRegel = this.rasterService.getRasterByCoordinate(
        this.feature.properties.position,
        this.currentLayer
      );
      if (rasterRegel !== undefined && rasterRegel !== null) {
        this.rasterDetails = rasterRegel.details;
        this.getTooltipData();
        this.loading = false;
      }
    }

    if (this.currentLayer === 'samstag') {
      const rasterSamstag = this.rasterService.getRasterByCoordinate(
        this.feature.properties.position,
        this.currentLayer
      );
      if (rasterSamstag !== undefined && rasterSamstag !== null) {
        this.rasterDetails = rasterSamstag.details;
        this.getTooltipData();
        this.loading = false;
      }
    }
  }

  plus8(): string {
    return this.currentLayer === 'express' ? 'Express 8:' : 'Plus 8:';
  }

  plus9(): string {
    return this.currentLayer === 'express' ? 'Express 9:' : 'Plus 9:';
  }

  plus10(): string {
    return this.currentLayer === 'express' ? 'Express 10:' : 'Plus 10:';
  }

  plus12(): string {
    return this.currentLayer === 'express' ? 'Express 12:' : 'Plus 12:';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cd.detach();
  }
}
