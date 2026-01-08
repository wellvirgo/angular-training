import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGrid } from './button-grid';

describe('ButtonGrid', () => {
  let component: ButtonGrid;
  let fixture: ComponentFixture<ButtonGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
