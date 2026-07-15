import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsPage } from './sensors-page';

describe('SensorsPage', () => {
  let component: SensorsPage;
  let fixture: ComponentFixture<SensorsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
