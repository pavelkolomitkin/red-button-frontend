import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMapWidgetComponent } from './company-map-widget.component';

describe('CompanyMapWidgetComponent', () => {
  let component: CompanyMapWidgetComponent;
  let fixture: ComponentFixture<CompanyMapWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMapWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMapWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
