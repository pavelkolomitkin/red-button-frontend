import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRepresentativeListComponent } from './company-representative-list.component';

describe('CompanyRepresentativeListComponent', () => {
  let component: CompanyRepresentativeListComponent;
  let fixture: ComponentFixture<CompanyRepresentativeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRepresentativeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRepresentativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
