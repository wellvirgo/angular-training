import { Component, input, output } from '@angular/core';
import { TuiButton } from "@taiga-ui/core";

@Component({
  selector: 'app-button',
  imports: [TuiButton],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  appearanceList = [
    'primary',
    'secondary',
    'primary-destructive',
    'primary-grayscale',
    'accent',
    'positive'
  ];

  size = input<'s' | 'm' | 'l' | 'xs'>('m')
  appearance = input<typeof this.appearanceList[number]>('primary');

  action = output<void>();

  onClick() {
    this.action.emit();
  }
}
