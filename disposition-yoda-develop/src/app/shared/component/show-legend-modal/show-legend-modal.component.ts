import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {strategicDispoConfig} from '@modules/strategic-dispo/strategic-dispo.config';

@Component({
  selector: 'app-show-legend-modal',
  templateUrl: './show-legend-modal.component.html',
  styleUrls: ['./show-legend-modal.component.scss']
})
export class ShowLegendModalComponent implements OnInit {

  public mDisopActivated: boolean;

  public heatmapColors = strategicDispoConfig.map.grid.styles.heatMap;

  public iconDefinitions = [
    {
      icon: 'fas fa-pallet',
      description: 'SATTEL'
    },
    {
      icon: 'fa fa-truck',
      description: 'LKW'
    },
    {
      icon: 'fas fa-shipping-fast',
      description: 'EXPRESS'
    },
    {
      icon: 'fa fa-cubes',
      description: 'NORMAL'
    },
    {
      icon: 'fab fa-stripe-s',
      description: 'SAMSTAG'
    }
  ];

  public stoppDefinitions =
    [
      {
        color: 'red',
        description: 'Unverplant',
      },
      {
        color: 'grey',
        description: 'Verplant',
      },
      {
        color: '#f27e00',
        description: 'Aktuell selektierter Stopp',
      },
      {
        color: '#2882C8',
        description: 'Stopp der aktuellen Tour',
      }
    ];

  constructor(private modalRef: BsModalRef, private route: Router) {
  }

  ngOnInit(): void {
    if (this.route.url.includes('manual')) {
      this.mDisopActivated = true;
    } else if (this.route.url.includes('strategic')) {
      this.mDisopActivated = false;
    }
  }


  close(): void {
    this.modalRef.hide();
  }
}
