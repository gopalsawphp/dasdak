import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitLayoutComponent } from './admit-layout.component';

describe('AdmitLayoutComponent', () => {
  let component: AdmitLayoutComponent;
  let fixture: ComponentFixture<AdmitLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmitLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
