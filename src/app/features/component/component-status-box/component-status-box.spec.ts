import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentStatusBox } from './component-status-box';

describe('ComponentStatusBox', () => {
  let component: ComponentStatusBox;
  let fixture: ComponentFixture<ComponentStatusBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentStatusBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentStatusBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
