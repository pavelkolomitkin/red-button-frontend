import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagListFieldComponent } from './tag-list-field.component';

describe('TagListFieldComponent', () => {
  let component: TagListFieldComponent;
  let fixture: ComponentFixture<TagListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagListFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
