import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MasterDataContainerComponent} from '@modules/manual-dispo/container';
import {RouterTestingModule} from '@angular/router/testing';

describe('MasterDataContainerComponent', () => {
  let component: MasterDataContainerComponent;
  let fixture: ComponentFixture<MasterDataContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDataContainerComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
