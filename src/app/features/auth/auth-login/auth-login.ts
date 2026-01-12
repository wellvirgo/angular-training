import { Component, inject, signal } from '@angular/core';
import { TuiTextfield, TuiIcon, TuiLoader, tuiLoaderOptionsProvider, TuiError } from '@taiga-ui/core';
import { InputLabel } from "../../../shared/input-label/input-label";
import { TuiFieldErrorPipe, TuiPassword } from "@taiga-ui/kit";
import { TuiForm } from "@taiga-ui/layout";
import { Button } from "../../../shared/button/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthReq } from '../../../core/dto/auth/auth-req';
import { AuthService } from '../../../core/service/auth/auth-service';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NotifyService } from '../../../shared/notification/notify-service';

type LoginFormControls = {
  [K in keyof AuthReq]: FormControl<AuthReq[K]>;
}

@Component({
  selector: 'app-auth-login',
  imports: [TuiTextfield, InputLabel, TuiPassword, TuiIcon, TuiForm, Button, ReactiveFormsModule, TuiLoader, AsyncPipe, TuiFieldErrorPipe, TuiError],
  templateUrl: './auth-login.html',
  styleUrl: './auth-login.css',
  providers: [
    tuiLoaderOptionsProvider({
      size: 'l',
      overlay: true,
    })
  ]
})
export class AuthLogin {
  private authService = inject(AuthService);
  private notifyService = inject(NotifyService);

  protected loginForm = new FormGroup<LoginFormControls>({
    username: new FormControl<any>(null, [Validators.required]),
    password: new FormControl<any>(null, [Validators.required]),
  })

  protected isLoading = signal(false);

  protected login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.notifyService.notifyError(undefined, 'Please fill in all required fields.', 3000);
      return;
    }

    this.isLoading.update(() => true);

    const payload: AuthReq = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? '',
    };

    this.authService.requestToken(payload)
      .pipe(
        filter(httpResponse => httpResponse.ok),
        map(httpResponse => httpResponse.body)
      )
      .subscribe(
        {
          next: (apiResponse) => {
            if (apiResponse?.code === '200' && apiResponse.data) {
              this.authService.login(apiResponse.data.accessToken);
            }
            this.isLoading.update(() => false);
          },
          error: (errorResponse) => {
            this.notifyService.notifyError(undefined, `${errorResponse.error?.message || 'Login failed. Please try again.'}`, 5000);
            this.isLoading.update(() => false);
          }
        }
      );
  }

}
