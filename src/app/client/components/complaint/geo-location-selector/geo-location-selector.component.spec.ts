import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoLocationSelectorComponent } from './geo-location-selector.component';

describe('GeoLocationSelectorComponent', () => {
  let component: GeoLocationSelectorComponent;
  let fixture: ComponentFixture<GeoLocationSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoLocationSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoLocationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
