import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerModel} from "../../shared/models/customer.model";
import {ServiceApi} from "../../service/service";
import {CellClickedEvent, ColDef, GridReadyEvent} from "ag-grid-community";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AgGridAngular} from "ag-grid-angular";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit{

  customerList: CustomerModel[] = [];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private service: ServiceApi,private http:HttpClient, private keycloakService: KeycloakService) {

  }

  // Each Column Definition results in one Column.
  public  columnDefs: ColDef[] = [
     {
      field: 'id',
      headerName: 'Id',
      headerTooltip: 'id'
    },
    {
      field: 'name',
      headerName: 'name',
    },{
      field: 'email',
      headerName: 'email',
    },{
      field: 'age',
      headerName: 'age',
    }
  ];

  // DefaultColDef sets props common to all Columns



user = '';

  ngOnInit(): void {


  // let result =   this.keycloakService.getKeycloakInstance().token;
  //   console.log(result)
  //   this.service.getAllCustomers().subscribe((response : CustomerModel[]) => {
  //       this.customerList = response;
  //
  //       console.log("customers List ",response)
  //     },
  //     (error) => {
  //       console.log("error ",error);
  //     }
  //     );
  }

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  // @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  onGridReady(params: GridReadyEvent) {
    // this.rowData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
    this.rowData$ = this.service.getAllCustomers();
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }


  // Example load data from sever
  updateEmployee( id:number ){

  }
  deleteEmployee(id:number){

  }


  logout() {




    // this.keycloakService.logout().then(() => this.keycloakService.clearToken());
    this.keycloakService.logout("http://localhost:4200/welcome");

  }
}
