import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellreportComponent } from './sellreport.component';

describe('SellreportComponent', () => {
  let component: SellreportComponent;
  let fixture: ComponentFixture<SellreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
