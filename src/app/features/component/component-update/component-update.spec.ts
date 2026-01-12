import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentUpdate } from './component-update';

describe('ComponentUpdate', () => {
  let component: ComponentUpdate;
  let fixture: ComponentFixture<ComponentUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
