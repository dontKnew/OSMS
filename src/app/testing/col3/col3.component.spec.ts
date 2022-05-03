import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Col3Component } from './col3.component';

describe('Col3Component', () => {
  let component: Col3Component;
  let fixture: ComponentFixture<Col3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Col3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Col3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
