import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionMapWidgetComponent } from './region-map-widget.component';

describe('RegionMapWidgetComponent', () => {
  let component: RegionMapWidgetComponent;
  let fixture: ComponentFixture<RegionMapWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionMapWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionMapWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
