import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintPicturesFieldComponent } from './complaint-pictures-field.component';

describe('ComplaintPicturesFieldComponent', () => {
  let component: ComplaintPicturesFieldComponent;
  let fixture: ComponentFixture<ComplaintPicturesFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintPicturesFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintPicturesFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
