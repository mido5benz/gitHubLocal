import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-master-data-container',
  templateUrl: './master-data-container.component.html',
  styleUrls: ['./master-data-container.component.scss']
})
export class MasterDataContainerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMap(): void {
    this.router.navigate(['manual-dispo']);
  }
}
