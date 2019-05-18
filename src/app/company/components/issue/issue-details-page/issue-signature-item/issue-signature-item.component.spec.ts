import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueSignatureItemComponent } from './issue-signature-item.component';

describe('IssueSignatureItemComponent', () => {
  let component: IssueSignatureItemComponent;
  let fixture: ComponentFixture<IssueSignatureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueSignatureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueSignatureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
