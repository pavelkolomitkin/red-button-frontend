import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStatisticPageComponent } from './company-statistic-page.component';

describe('CompanyStatisticPageComponent', () => {
  let component: CompanyStatisticPageComponent;
  let fixture: ComponentFixture<CompanyStatisticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyStatisticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStatisticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
