import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAdd } from './component-add';

describe('ComponentAdd', () => {
  let component: ComponentAdd;
  let fixture: ComponentFixture<ComponentAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
