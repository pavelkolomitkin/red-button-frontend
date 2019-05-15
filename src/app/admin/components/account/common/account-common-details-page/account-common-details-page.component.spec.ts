import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCommonDetailsPageComponent } from './account-common-details-page.component';

describe('AccountCommonDetailsPageComponent', () => {
  let component: AccountCommonDetailsPageComponent;
  let fixture: ComponentFixture<AccountCommonDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCommonDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCommonDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
