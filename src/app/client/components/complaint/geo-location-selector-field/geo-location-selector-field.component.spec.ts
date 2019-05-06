import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoLocationSelectorFieldComponent } from './geo-location-selector-field.component';

describe('GeoLocationSelectorFieldComponent', () => {
  let component: GeoLocationSelectorFieldComponent;
  let fixture: ComponentFixture<GeoLocationSelectorFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoLocationSelectorFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoLocationSelectorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
