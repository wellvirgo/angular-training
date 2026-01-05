import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTable } from './component-table';

describe('ComponentTable', () => {
  let component: ComponentTable;
  let fixture: ComponentFixture<ComponentTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
