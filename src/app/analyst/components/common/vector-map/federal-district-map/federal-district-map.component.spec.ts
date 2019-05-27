import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalDistrictMapComponent } from './federal-district-map.component';

describe('FederalDistrictMapComponent', () => {
  let component: FederalDistrictMapComponent;
  let fixture: ComponentFixture<FederalDistrictMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederalDistrictMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalDistrictMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
