import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPreviewModal } from './component-preview-modal';

describe('ComponentPreviewModal', () => {
  let component: ComponentPreviewModal;
  let fixture: ComponentFixture<ComponentPreviewModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentPreviewModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentPreviewModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
