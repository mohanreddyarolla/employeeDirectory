import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabeticalFiltersComponent } from './alphabetical-filters.component';

describe('AlphabeticalFiltersComponent', () => {
  let component: AlphabeticalFiltersComponent;
  let fixture: ComponentFixture<AlphabeticalFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlphabeticalFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlphabeticalFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
