import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySearchFormComponent } from './company-search-form.component';

describe('CompanySearchFormComponent', () => {
  let component: CompanySearchFormComponent;
  let fixture: ComponentFixture<CompanySearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
