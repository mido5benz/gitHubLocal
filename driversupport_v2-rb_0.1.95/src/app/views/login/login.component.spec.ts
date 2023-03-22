import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login.component';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not login', () => {
    expect(component.username).toEqual('');
  });

  it('should call login', () => {
    spyOn(component, 'login'); 
    // component.username = "DRIVES01";
    component.login();
    fixture.detectChanges(); // trigger ngOnInit here
    expect(component.login).toHaveBeenCalled(); 
  });

  

  it('should call login and redirect', () => {
    component.username = "DRIVES01";
    component.login();    
    let loginName = window.sessionStorage.getItem('loginName')
    expect(loginName).toEqual('DRIVES01');
  });

});
