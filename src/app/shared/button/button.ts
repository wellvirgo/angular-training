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
    'positive',
    'flat-destructive',
    'outline-destructive',
  ];

  size = input<'s' | 'm' | 'l' | 'xs'>('m')
  appearance = input<typeof this.appearanceList[number]>('primary');
  isDisabled = input<boolean>(false);

  action = output<void>();

  onClick() {
    this.action.emit();
  }
}
