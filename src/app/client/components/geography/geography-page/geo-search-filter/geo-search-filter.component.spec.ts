import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoSearchFilterComponent } from './geo-search-filter.component';

describe('GeoSearchFilterComponent', () => {
  let component: GeoSearchFilterComponent;
  let fixture: ComponentFixture<GeoSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
