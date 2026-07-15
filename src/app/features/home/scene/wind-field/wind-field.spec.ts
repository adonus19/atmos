import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindField } from './wind-field';

describe('WindField', () => {
  let component: WindField;
  let fixture: ComponentFixture<WindField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindField],
    }).compileComponents();

    fixture = TestBed.createComponent(WindField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
