import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationControlComponent } from './confirmation-control.component';

describe('ConfirmationControlComponent', () => {
  let component: ConfirmationControlComponent;
  let fixture: ComponentFixture<ConfirmationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
