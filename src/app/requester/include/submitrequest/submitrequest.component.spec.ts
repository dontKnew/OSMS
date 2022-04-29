import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitrequestComponent } from './submitrequest.component';

describe('SubmitrequestComponent', () => {
  let component: SubmitrequestComponent;
  let fixture: ComponentFixture<SubmitrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
