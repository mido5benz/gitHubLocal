import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {

  @Input() columns: any;
  @Input() data: any;
  sortActive:any ='';
  sortDirection:any = false;
  constructor(private ref : ChangeDetectorRef) { }

  ngOnInit() {

  }

  sortHeader(column,index){
    if(this.sortActive == column){
      this.sortDirection = !this.sortDirection;
    }else{
      this.sortActive = column;
      this.sortDirection = true;
    }
    let tempData = JSON.parse(JSON.stringify(this.data));

    if( column != 'Datum/Zeit'){
      if (this.sortDirection) {
        this.data = tempData.sort((a, b) => {
           return a[index].toUpperCase() > b[index].toUpperCase() ? 1 : (a[index].toUpperCase() < b[index].toUpperCase() ? -1 : 0);
         });
       }else{
         this.data = tempData.sort((a, b) => {
           return a[index].toUpperCase() > b[index].toUpperCase() ? -1 : (a[index].toUpperCase() < b[index].toUpperCase() ? 1 : 0);
         });
       }
    }
    if(column == 'Datum/Zeit'){
      if (this.sortDirection) {
        this.data = tempData.sort((a, b) => {
          var aDate = a[index] != '' ? a[index].split(' / ')[0].split('.').reverse().join('') : '0';
          var aTime = a[index] != '' ? a[index].split(' / ')[1].split(':').join('') : '0';
          var bDate = b[index] != '' ? b[index].split(' / ')[0].split('.').reverse().join('') : '0';
          var bTime = b[index] != '' ? b[index].split(' / ')[1].split(':').join('') : '0';
          var aDateTime = aDate + aTime;
          var bDateTime = bDate + bTime;
          return parseInt(aDateTime) >  parseInt(bDateTime) ? 1 : ( parseInt(aDateTime) < parseInt(bDateTime) ? -1 : 0);
         });
       }else{
         this.data = tempData.sort((a, b) => {
          var aDate = a[index] != '' ? a[index].split(' / ')[0].split('.').reverse().join('') : '0';
          var aTime = a[index] != '' ? a[index].split(' / ')[1].split(':').join('') : '0';
          var bDate = b[index] != '' ? b[index].split(' / ')[0].split('.').reverse().join('') : '0';
          var bTime = b[index] != '' ? b[index].split(' / ')[1].split(':').join('') : '0';
          var aDateTime = aDate + aTime;
          var bDateTime = bDate + bTime;
          return parseInt(aDateTime) >  parseInt(bDateTime) ? -1 : ( parseInt(aDateTime) < parseInt(bDateTime) ? 1 : 0);
         });
       }
    }


    if(column == 'Datum' || column == 'Ü-Datum'){
      if (this.sortDirection) {
        this.data = tempData.sort((a, b) => {
          var aDate = a[index] != '' ? a[index].split(' / ')[0].split('.').reverse().join('') : '0';
          // var aTime = a[index] != '' ? a[index].split(' / ')[1].split(':').join('') : '0';
          var bDate = b[index] != '' ? b[index].split(' / ')[0].split('.').reverse().join('') : '0';
          // var bTime = b[index] != '' ? b[index].split(' / ')[1].split(':').join('') : '0';
          var aDateTime = aDate ;
          var bDateTime = bDate ;
          return parseInt(aDateTime) >  parseInt(bDateTime) ? 1 : ( parseInt(aDateTime) < parseInt(bDateTime) ? -1 : 0);
         });
       }else{
         this.data = tempData.sort((a, b) => {
          var aDate = a[index] != '' ? a[index].split(' / ')[0].split('.').reverse().join('') : '0';
          // var aTime = a[index] != '' ? a[index].split(' / ')[1].split(':').join('') : '0';
          var bDate = b[index] != '' ? b[index].split(' / ')[0].split('.').reverse().join('') : '0';
          // var bTime = b[index] != '' ? b[index].split(' / ')[1].split(':').join('') : '0';
          var aDateTime = aDate ;
          var bDateTime = bDate ;
          return parseInt(aDateTime) >  parseInt(bDateTime) ? -1 : ( parseInt(aDateTime) < parseInt(bDateTime) ? 1 : 0);
         });
       }
    }

    this.ref.detectChanges();

  }
}
