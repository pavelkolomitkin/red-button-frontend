import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypePercentageItemComponent } from './service-type-percentage-item.component';

describe('ServiceTypePercentageItemComponent', () => {
  let component: ServiceTypePercentageItemComponent;
  let fixture: ComponentFixture<ServiceTypePercentageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTypePercentageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypePercentageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
