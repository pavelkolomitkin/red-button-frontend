import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintEditPageComponent } from './complaint-edit-page.component';

describe('ComplaintEditPageComponent', () => {
  let component: ComplaintEditPageComponent;
  let fixture: ComponentFixture<ComplaintEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
