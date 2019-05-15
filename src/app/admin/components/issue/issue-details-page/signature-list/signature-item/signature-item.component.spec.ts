import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureItemComponent } from './signature-item.component';

describe('SignatureItemComponent', () => {
  let component: SignatureItemComponent;
  let fixture: ComponentFixture<SignatureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
