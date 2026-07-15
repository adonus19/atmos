import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitationLayer } from './precipitation-layer';

describe('PrecipitationLayer', () => {
  let component: PrecipitationLayer;
  let fixture: ComponentFixture<PrecipitationLayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecipitationLayer],
    }).compileComponents();

    fixture = TestBed.createComponent(PrecipitationLayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
