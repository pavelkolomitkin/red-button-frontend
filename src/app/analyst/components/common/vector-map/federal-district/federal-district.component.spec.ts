import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalDistrictComponent } from './federal-district.component';

describe('FederalDistrictComponent', () => {
  let component: FederalDistrictComponent;
  let fixture: ComponentFixture<FederalDistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederalDistrictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
