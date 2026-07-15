import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BottomNavigation } from './bottom-navigation';

describe('BottomNavigation', () => {
  let component: BottomNavigation;
  let fixture: ComponentFixture<BottomNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavigation],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains the five approved primary destinations', () => {
    const labels = Array.from(
      fixture.nativeElement.querySelectorAll('a'),
      (link: HTMLAnchorElement) => link.textContent?.trim(),
    );
    expect(labels).toEqual(['⌂Home', '≋Layers', '→Flow', '⌁Sensors', '•••More']);
  });
});
