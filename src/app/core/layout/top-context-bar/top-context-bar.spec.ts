import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContextBar } from './top-context-bar';

describe('TopContextBar', () => {
  let component: TopContextBar;
  let fixture: ComponentFixture<TopContextBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopContextBar],
    }).compileComponents();

    fixture = TestBed.createComponent(TopContextBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
