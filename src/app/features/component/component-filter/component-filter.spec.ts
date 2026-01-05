import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFilter } from './component-filter';

describe('ComponentFilter', () => {
  let component: ComponentFilter;
  let fixture: ComponentFixture<ComponentFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
