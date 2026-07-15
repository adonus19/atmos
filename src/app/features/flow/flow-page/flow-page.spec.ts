import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowPage } from './flow-page';

describe('FlowPage', () => {
  let component: FlowPage;
  let fixture: ComponentFixture<FlowPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
