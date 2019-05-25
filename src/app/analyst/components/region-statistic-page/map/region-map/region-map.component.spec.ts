import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionMapComponent } from './region-map.component';

describe('RegionMapComponent', () => {
  let component: RegionMapComponent;
  let fixture: ComponentFixture<RegionMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
