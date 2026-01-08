import { Component } from '@angular/core';
import { Button } from "../button/button";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-grid',
  imports: [Button],
  templateUrl: './button-grid.html',
  styleUrl: './button-grid.css',
})
export class ButtonGrid implements ICellRendererAngularComp {
  params?: ICellRendererParams<any, any, any>;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;

  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false
  }

  onUpdateClick() {

  }

}
