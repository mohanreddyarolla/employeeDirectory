import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchFiltersComponent } from './input-search-filters.component';

describe('InputSearchFiltersComponent', () => {
  let component: InputSearchFiltersComponent;
  let fixture: ComponentFixture<InputSearchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSearchFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
