import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintCreatePageComponent } from './complaint-create-page.component';

describe('ComplaintCreatePageComponent', () => {
  let component: ComplaintCreatePageComponent;
  let fixture: ComponentFixture<ComplaintCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
