import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRepresentativeFormComponent } from './company-representative-form.component';

describe('CompanyRepresentativeFormComponent', () => {
  let component: CompanyRepresentativeFormComponent;
  let fixture: ComponentFixture<CompanyRepresentativeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRepresentativeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRepresentativeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
