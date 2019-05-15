import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystListPageComponent } from './analyst-list-page.component';

describe('AnalystListPageComponent', () => {
  let component: AnalystListPageComponent;
  let fixture: ComponentFixture<AnalystListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
