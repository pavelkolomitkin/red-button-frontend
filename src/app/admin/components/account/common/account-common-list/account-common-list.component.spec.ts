import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCommonListComponent } from './account-common-list.component';

describe('AccountCommonListComponent', () => {
  let component: AccountCommonListComponent;
  let fixture: ComponentFixture<AccountCommonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCommonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCommonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
