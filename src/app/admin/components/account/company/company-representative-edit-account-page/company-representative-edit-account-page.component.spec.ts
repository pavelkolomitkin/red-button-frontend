import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRepresentativeEditAccountPageComponent } from './company-representative-edit-account-page.component';

describe('CompanyRepresentativeEditAccountPageComponent', () => {
  let component: CompanyRepresentativeEditAccountPageComponent;
  let fixture: ComponentFixture<CompanyRepresentativeEditAccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRepresentativeEditAccountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRepresentativeEditAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
