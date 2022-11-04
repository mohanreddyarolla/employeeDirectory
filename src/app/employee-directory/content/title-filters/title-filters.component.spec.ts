import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleFiltersComponent } from './title-filters.component';

describe('TitleFiltersComponent', () => {
  let component: TitleFiltersComponent;
  let fixture: ComponentFixture<TitleFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
