import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectedLocationComponent } from './map-selected-location.component';

describe('MapSelectedLocationComponent', () => {
  let component: MapSelectedLocationComponent;
  let fixture: ComponentFixture<MapSelectedLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectedLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectedLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
