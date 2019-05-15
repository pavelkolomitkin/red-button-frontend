import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystAccountCreatePageComponent } from './analyst-account-create-page.component';

describe('AnalystAccountCreatePageComponent', () => {
  let component: AnalystAccountCreatePageComponent;
  let fixture: ComponentFixture<AnalystAccountCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystAccountCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystAccountCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
