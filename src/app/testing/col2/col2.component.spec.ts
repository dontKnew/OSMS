import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Col2Component } from './col2.component';

describe('Col2Component', () => {
  let component: Col2Component;
  let fixture: ComponentFixture<Col2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Col2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Col2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
