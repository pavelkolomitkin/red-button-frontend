import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCommonFormComponent } from './account-common-form.component';

describe('AccountCommonFormComponent', () => {
  let component: AccountCommonFormComponent;
  let fixture: ComponentFixture<AccountCommonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCommonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCommonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
