import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCombobox } from './test-combobox';

describe('TestCombobox', () => {
  let component: TestCombobox;
  let fixture: ComponentFixture<TestCombobox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCombobox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCombobox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
