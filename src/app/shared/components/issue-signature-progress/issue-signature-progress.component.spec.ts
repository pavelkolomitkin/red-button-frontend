import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueSignatureProgressComponent } from './issue-signature-progress.component';

describe('IssueSignatureProgressComponent', () => {
  let component: IssueSignatureProgressComponent;
  let fixture: ComponentFixture<IssueSignatureProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueSignatureProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueSignatureProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
