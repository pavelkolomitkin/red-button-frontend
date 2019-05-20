import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypeItemComponent } from './service-type-item.component';

describe('ServiceTypeItemComponent', () => {
  let component: ServiceTypeItemComponent;
  let fixture: ComponentFixture<ServiceTypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTypeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
