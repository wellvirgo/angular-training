import { Component } from '@angular/core';
import { Button } from "../button/button";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

interface ButtonGridParams extends ICellRendererParams {
  updateButtonClick: (id: string | number) => void;
  deleteButtonClick?: (id: string | number) => void;
}

@Component({
  selector: 'app-button-grid',
  imports: [Button],
  templateUrl: './button-grid.html',
  styleUrl: './button-grid.css',
})
export class ButtonGrid implements ICellRendererAngularComp {
  params?: ButtonGridParams;

  agInit(params: ButtonGridParams): void {
    this.params = params;

  }
  refresh(params: ButtonGridParams): boolean {
    return false
  }

  onUpdateClick() {
    if (this.params?.value) {
      this.params?.updateButtonClick(this.params.value);
    }
  }

  onDeleteClick() {
    if (this.params?.value && this.params?.deleteButtonClick) {
      this.params?.deleteButtonClick(this.params.value);
    }
  }
}
