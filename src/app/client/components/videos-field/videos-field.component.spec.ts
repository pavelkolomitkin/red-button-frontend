import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosFieldComponent } from './videos-field.component';

describe('VideosFieldComponent', () => {
  let component: VideosFieldComponent;
  let fixture: ComponentFixture<VideosFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
