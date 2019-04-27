import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBalloonComponent } from './map-balloon.component';

describe('MapBalloonComponent', () => {
  let component: MapBalloonComponent;
  let fixture: ComponentFixture<MapBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
