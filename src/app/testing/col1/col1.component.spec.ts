import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Col1Component } from './col1.component';

describe('Col1Component', () => {
  let component: Col1Component;
  let fixture: ComponentFixture<Col1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Col1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Col1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
