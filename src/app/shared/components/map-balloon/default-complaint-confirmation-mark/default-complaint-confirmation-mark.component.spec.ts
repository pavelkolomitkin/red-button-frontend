import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultComplaintConfirmationMarkComponent } from './default-complaint-confirmation-mark.component';

describe('DefaultComplaintConfirmationMarkComponent', () => {
  let component: DefaultComplaintConfirmationMarkComponent;
  let fixture: ComponentFixture<DefaultComplaintConfirmationMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultComplaintConfirmationMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComplaintConfirmationMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
