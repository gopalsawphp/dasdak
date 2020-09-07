import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsSignupComponent } from './guests-signup.component';

describe('GuestsSignupComponent', () => {
  let component: GuestsSignupComponent;
  let fixture: ComponentFixture<GuestsSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestsSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestsSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
