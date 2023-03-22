import {Component, Input, OnInit} from '@angular/core';
import {DispoStopp, DispoSum} from '@shared/models';

@Component({
  selector: 'app-service-images-list',
  templateUrl: './service-images-list.component.html',
  styleUrls: ['./service-images-list.component.scss']
})
export class ServiceImagesListComponent implements OnInit {

  @Input() dispoSum: DispoSum[];
  @Input() stopp: DispoStopp;

  public services: { count: number; imgSrc: string }[];

  constructor() {
  }

  ngOnInit(): void {
    const currentSums = this.dispoSum.find((sum: DispoSum) => sum.dispostopp_id === this.stopp.dispostopp_id);

    this.services = [
      {
        count: currentSums?.abend_sum ? currentSums.abend_sum : 0,
        imgSrc: 'assets/icons/ambient.svg',
      },
      {
        count: currentSums?.kl7_sum ? currentSums?.kl7_sum : 0,
        imgSrc: 'assets/icons/gefahrgut.svg',
      },
    ];
  }
}
