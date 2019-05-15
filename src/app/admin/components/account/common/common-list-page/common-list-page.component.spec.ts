import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonListPageComponent } from './common-list-page.component';

describe('CommonListPageComponent', () => {
  let component: CommonListPageComponent;
  let fixture: ComponentFixture<CommonListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
