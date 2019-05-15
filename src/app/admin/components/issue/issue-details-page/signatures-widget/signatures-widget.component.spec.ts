import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturesWidgetComponent } from './signatures-widget.component';

describe('SignaturesWidgetComponent', () => {
  let component: SignaturesWidgetComponent;
  let fixture: ComponentFixture<SignaturesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaturesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
