/* eslint-disable */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { VehicleTypePipe } from '@app/shared/pipes/vehicleType/vehicleType.pipe';
// import { CurrentFiltersComponent } from './current-filters.component';

// describe('CurrentFiltersComponent', () => {
//   let component: CurrentFiltersComponent;
//   let fixture: ComponentFixture<CurrentFiltersComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [CurrentFiltersComponent, VehicleTypePipe],
//       imports: [],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CurrentFiltersComponent);
//     component = fixture.componentInstance;

//     component.tourFilters = [];
//     component.serviceFilters = [];
//     component.vehicleType = '0';
//     component.semitrailer = false;
//     component.truck = false;

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should show "Keine Filter aktiv" because we have no active filter', () => {
//     const element = fixture.debugElement.query(By.css('.tourFiltersActive'));
//     expect(element).toBeNull();
//   });

//   it('Should display the filtered tours (The comma seperator will be added via scss', () => {
//     const tourFilters = ['1-830', '1-831'];
//     component.tourFilters = tourFilters;
//     fixture.detectChanges();

//     const element = fixture.debugElement.query(By.css('.collapsedTourFilter'));

//     expect(element.nativeElement.innerText).toBe('Touren: 1-8301-831');
//   });

//   it('Should display the count of all filtered tours because the count of the tours is greater than 2', () => {
//     const tourFilters = ['1-830', '1-230', '1-430'];
//     component.tourFilters = tourFilters;
//     fixture.detectChanges();

//     const element = fixture.debugElement.query(By.css('.toursFilter'));

//     expect(element.nativeElement.innerText).toBe(
//       `Touren: ${tourFilters.length}`
//     );
//   });

//   it('Should display the filtered services (The comma seperator will be added via scss', () => {
//     const serviceFilters = ['+9', '+10'];
//     component.serviceFilters = serviceFilters;
//     fixture.detectChanges();

//     const element = fixture.debugElement.query(
//       By.css('.collapsedServiceFilter')
//     );

//     expect(element.nativeElement.innerText).toBe('Dienste: +9+10');
//   });

//   it('Should display the count of all filtered tours because the count of the tours is greater than 2', () => {
//     const serviceFilters = ['+9', '+10', 'Ambient'];
//     component.serviceFilters = serviceFilters;
//     fixture.detectChanges();

//     const element = fixture.debugElement.query(By.css('.serviceFilter'));

//     expect(element.nativeElement.innerText).toBe(
//       `Dienste: ${serviceFilters.length}`
//     );
//   });

//   it('should hide "Keine Filter aktiv" because the vehicle type is set', () => {
//     component.vehicleType = '1';
//     fixture.detectChanges();

//     const element = fixture.debugElement.query(By.css('.tourFiltersInactive'));

//     expect(element).toBeNull();
//   });

//   it('should show "the Fahrzeugtyp:" filter because the vehicleType input is set to 1', () => {
//     component.vehicleType = '1';
//     fixture.detectChanges();

//     const element = fixture.debugElement.query(By.css('.vehicleFilter'));

//     expect(element.nativeElement.innerText).toBe('Fahrzeugtyp: PKW');
//   });

//   it('should show the "Sattel" filter because the semitrailer input is set to true', () => {
//     component.semitrailer = true;
//     fixture.detectChanges();

//     const element = fixture.debugElement.query(By.css('.semiTrailerFilter'));

//     expect(element.nativeElement.innerText).toBe('Sattel: ');
//   });

//   it('should show the "LKW" filter because the semitrailer input is set to true', () => {
//     component.truck = true;
//     fixture.detectChanges();

//     const element = fixture.debugElement.query(By.css('.truckFilter'));
//     expect(element.nativeElement.innerText).toBe('LKW: ');
//   });
// });
