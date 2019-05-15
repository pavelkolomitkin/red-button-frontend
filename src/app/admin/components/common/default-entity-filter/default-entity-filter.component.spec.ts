import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultEntityFilterComponent } from './default-entity-filter.component';

describe('DefaultEntityFilterComponent', () => {
  let component: DefaultEntityFilterComponent;
  let fixture: ComponentFixture<DefaultEntityFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultEntityFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultEntityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
