import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticFilterComponent } from './statistic-filter.component';

describe('StatisticFilterComponent', () => {
  let component: StatisticFilterComponent;
  let fixture: ComponentFixture<StatisticFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
