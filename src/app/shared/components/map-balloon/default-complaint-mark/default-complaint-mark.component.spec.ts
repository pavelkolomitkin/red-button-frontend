import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultComplaintMarkComponent } from './default-complaint-mark.component';

describe('DefaultComplaintMarkComponent', () => {
  let component: DefaultComplaintMarkComponent;
  let fixture: ComponentFixture<DefaultComplaintMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultComplaintMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComplaintMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
