import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRepresentativeCreateAccountPageComponent } from './company-representative-create-account-page.component';

describe('CompanyRepresentativeCreateAccountPageComponent', () => {
  let component: CompanyRepresentativeCreateAccountPageComponent;
  let fixture: ComponentFixture<CompanyRepresentativeCreateAccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRepresentativeCreateAccountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRepresentativeCreateAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
