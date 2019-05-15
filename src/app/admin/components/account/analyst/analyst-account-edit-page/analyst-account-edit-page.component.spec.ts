import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystAccountEditPageComponent } from './analyst-account-edit-page.component';

describe('AnalystAccountEditPageComponent', () => {
  let component: AnalystAccountEditPageComponent;
  let fixture: ComponentFixture<AnalystAccountEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystAccountEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystAccountEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
