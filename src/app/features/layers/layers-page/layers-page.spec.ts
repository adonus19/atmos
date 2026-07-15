import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersPage } from './layers-page';

describe('LayersPage', () => {
  let component: LayersPage;
  let fixture: ComponentFixture<LayersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayersPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LayersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
