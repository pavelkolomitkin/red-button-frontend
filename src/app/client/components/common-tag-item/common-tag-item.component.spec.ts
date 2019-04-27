import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTagItemComponent } from './common-tag-item.component';

describe('CommonTagItemComponent', () => {
  let component: CommonTagItemComponent;
  let fixture: ComponentFixture<CommonTagItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonTagItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTagItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
