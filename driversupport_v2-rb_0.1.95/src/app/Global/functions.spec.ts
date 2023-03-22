import { TestBed } from '@angular/core/testing';
import { Functions } from './functions';
import { IndividualConfig, ToastrService, TOAST_CONFIG } from 'ngx-toastr';

fdescribe('Functions', () => {

  let functions: Functions;
  const toastrService = {
    success: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers:[{ provide: ToastrService, useValue: ToastrService }]
  }));

  beforeEach(() => {
    functions = TestBed.get(Functions);
  });

  
  it('should create Function Class', () => {    
    expect(functions).toBeTruthy();
   });
 
  it('should Call the Show Snackbar Method', () => {
   let message = 'Unit Testing'; 
   spyOn(functions,'showSnackBar');
   functions.showSnackBar(message);
   expect(functions.showSnackBar).toHaveBeenCalled();
  });



});
