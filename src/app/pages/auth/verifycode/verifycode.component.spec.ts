import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifycodeComponent } from './verifycode.component';

describe('VerifycodeComponent', () => {
  let component: VerifycodeComponent;
  let fixture: ComponentFixture<VerifycodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifycodeComponent]
    });
    fixture = TestBed.createComponent(VerifycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
