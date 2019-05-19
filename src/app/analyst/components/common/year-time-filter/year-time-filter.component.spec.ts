import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearTimeFilterComponent } from './year-time-filter.component';

describe('YearTimeFilterComponent', () => {
  let component: YearTimeFilterComponent;
  let fixture: ComponentFixture<YearTimeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearTimeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearTimeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
