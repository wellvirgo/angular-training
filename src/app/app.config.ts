import { provideEventPlugins } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { TUI_VALIDATION_ERRORS } from "@taiga-ui/kit";
import { authInterceptor } from "./core/service/auth/auth-interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideEventPlugins(),
        provideHttpClient(withInterceptors([authInterceptor])),
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: "This field is required",
                maxlength: (context: { requiredLength: number, actualLength: number }) =>
                    `Maximum length is ${context.requiredLength} characters, but got ${context.actualLength}`,
                mustInFutureDate: (context: { invalidDate: string }) =>
                    `The date must be not in the past. Invalid date: ${context.invalidDate}`,
                updateDateMustInFutureDate: (context: { invalidDate: string }) =>
                    `The date must be not in the past. Invalid date: ${context.invalidDate}`,
            }
        }
    ]
};
