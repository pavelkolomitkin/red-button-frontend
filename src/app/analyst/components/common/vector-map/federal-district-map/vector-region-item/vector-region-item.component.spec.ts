import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorRegionItemComponent } from './vector-region-item.component';

describe('VectorRegionItemComponent', () => {
  let component: VectorRegionItemComponent;
  let fixture: ComponentFixture<VectorRegionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorRegionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorRegionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
