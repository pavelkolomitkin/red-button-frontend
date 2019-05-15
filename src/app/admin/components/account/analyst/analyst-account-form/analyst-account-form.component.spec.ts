import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystAccountFormComponent } from './analyst-account-form.component';

describe('AnalystAccountFormComponent', () => {
  let component: AnalystAccountFormComponent;
  let fixture: ComponentFixture<AnalystAccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystAccountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
