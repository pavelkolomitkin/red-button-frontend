import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBalloonGroupComponent } from './map-balloon-group.component';

describe('MapBalloonGroupComponent', () => {
  let component: MapBalloonGroupComponent;
  let fixture: ComponentFixture<MapBalloonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBalloonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBalloonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
