import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintListPageComponent } from './complaint-list-page.component';

describe('ComplaintListPageComponent', () => {
  let component: ComplaintListPageComponent;
  let fixture: ComponentFixture<ComplaintListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
