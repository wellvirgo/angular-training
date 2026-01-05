import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDashboard } from './component-dashboard';

describe('ComponentDashboard', () => {
  let component: ComponentDashboard;
  let fixture: ComponentFixture<ComponentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
