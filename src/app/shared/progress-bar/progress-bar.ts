import { AsyncPipe, isPlatformServer } from '@angular/common';
import { Component, inject, input, PLATFORM_ID } from '@angular/core';
import { TUI_IS_E2E } from '@taiga-ui/cdk';
import { TuiProgressBar } from "@taiga-ui/kit";
import { of, timer } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  imports: [TuiProgressBar, AsyncPipe],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {
  private readonly animationDisabled = inject(TUI_IS_E2E) || isPlatformServer(inject(PLATFORM_ID));
  protected readonly fastValue = this.animationDisabled ? of(50) : timer(500, 100);

  maxValue = input.required<number>();
}
