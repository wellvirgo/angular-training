import { Component, inject, signal } from '@angular/core';
import { Button } from "../button/button";
import { AuthService } from '../../core/service/auth/auth-service';
import { finalize } from 'rxjs';
import { TuiLoader } from '@taiga-ui/core';
import { ProgressBar } from "../progress-bar/progress-bar";

@Component({
  selector: 'app-header',
  imports: [Button, TuiLoader, ProgressBar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(AuthService);
  protected isAuthenticated = this.authService.isAuthenticated;
  protected isLoading = signal(false);

  handleLogout() {
    this.isLoading.set(true);
    this.authService.requestLogout()
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          this.authService.logout()
        })
      )
      .subscribe();
  }
}
