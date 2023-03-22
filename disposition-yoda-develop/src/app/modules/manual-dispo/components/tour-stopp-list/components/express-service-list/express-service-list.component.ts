import {Component, Input, OnInit} from '@angular/core';
import {DispoStopp, DispoSum, ExpressSums} from '@shared/models';

@Component({
  selector: 'app-express-service-list',
  templateUrl: './express-service-list.component.html',
  styleUrls: ['./express-service-list.component.scss']
})
export class ExpressServiceListComponent implements OnInit {

  @Input()
  set sum(sum: DispoSum) {
    this.expressSums = {
      p8_sum: sum?.p8_sum,
      p9_sum: sum?.p9_sum,
      p10_sum: sum?.p10_sum,
      p12_sum: sum?.p12_sum,
      kl7_sum: sum?.kl7_sum,
      amb_sum: sum?.amb_sum,
      abend_sum: sum?.abend_sum
    };
  }

  @Input() stopp: DispoStopp;

  public expressSums: ExpressSums;

  constructor() {
  }

  ngOnInit(): void {
  }
}

