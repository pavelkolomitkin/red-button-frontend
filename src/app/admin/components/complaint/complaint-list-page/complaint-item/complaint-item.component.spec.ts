import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintItemComponent } from './complaint-item.component';

describe('ComplaintItemComponent', () => {
  let component: ComplaintItemComponent;
  let fixture: ComponentFixture<ComplaintItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
