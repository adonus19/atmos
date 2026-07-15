import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyLayer } from './sky-layer';

describe('SkyLayer', () => {
  let component: SkyLayer;
  let fixture: ComponentFixture<SkyLayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkyLayer],
    }).compileComponents();

    fixture = TestBed.createComponent(SkyLayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
