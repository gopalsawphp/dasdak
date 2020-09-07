import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationVerifyComponent } from './registration-verify.component';

describe('RegistrationVerifyComponent', () => {
  let component: RegistrationVerifyComponent;
  let fixture: ComponentFixture<RegistrationVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
