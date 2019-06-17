import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgreementWindowComponent } from './user-agreement-window.component';

describe('UserAgreementWindowComponent', () => {
  let component: UserAgreementWindowComponent;
  let fixture: ComponentFixture<UserAgreementWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAgreementWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgreementWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
