import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStatisticPageComponent } from './common-statistic-page.component';

describe('CommonStatisticPageComponent', () => {
  let component: CommonStatisticPageComponent;
  let fixture: ComponentFixture<CommonStatisticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonStatisticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonStatisticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
