import { inject, Injectable } from "@angular/core";
import { TuiAlertService } from "@taiga-ui/core";

@Injectable({ providedIn: 'root' })
export class NotifyService {
    private alertService = inject(TuiAlertService);

    public notifySuccess(title: string = "Success", message: string = "success", duration: number = 2000): void {
        this.alertService.open(`<span class="success-message">${message}</span>`, {
            label: title,
            appearance: 'positive',
            autoClose: duration
        }).subscribe();
    }
}