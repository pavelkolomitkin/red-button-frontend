import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographyPageComponent } from './geography-page.component';

describe('GeographyPageComponent', () => {
  let component: GeographyPageComponent;
  let fixture: ComponentFixture<GeographyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
