import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountActiveSwitcherComponent } from './account-active-switcher.component';

describe('AccountActiveSwitcherComponent', () => {
  let component: AccountActiveSwitcherComponent;
  let fixture: ComponentFixture<AccountActiveSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountActiveSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountActiveSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
