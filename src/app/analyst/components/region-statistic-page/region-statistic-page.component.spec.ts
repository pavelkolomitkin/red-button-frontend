import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionStatisticPageComponent } from './region-statistic-page.component';

describe('RegionStatisticPageComponent', () => {
  let component: RegionStatisticPageComponent;
  let fixture: ComponentFixture<RegionStatisticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionStatisticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionStatisticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
