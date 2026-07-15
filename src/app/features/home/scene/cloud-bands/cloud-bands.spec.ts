import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudBands } from './cloud-bands';

describe('CloudBands', () => {
  let component: CloudBands;
  let fixture: ComponentFixture<CloudBands>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudBands],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudBands);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
