import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySearchFieldComponent } from './company-search-field.component';

describe('CompanySearchFieldComponent', () => {
  let component: CompanySearchFieldComponent;
  let fixture: ComponentFixture<CompanySearchFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySearchFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
