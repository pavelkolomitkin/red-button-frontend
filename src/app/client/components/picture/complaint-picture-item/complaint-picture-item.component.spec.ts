import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintPictureItemComponent } from './complaint-picture-item.component';

describe('ComplaintPictureItemComponent', () => {
  let component: ComplaintPictureItemComponent;
  let fixture: ComponentFixture<ComplaintPictureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintPictureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintPictureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
