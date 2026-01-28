import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormAddition } from './test-form-addition';

describe('TestFormAddition', () => {
  let component: TestFormAddition;
  let fixture: ComponentFixture<TestFormAddition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFormAddition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFormAddition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
