import { inject, Injectable } from "@angular/core";
import { TuiAlertService, TuiDialogService } from "@taiga-ui/core";
import { TUI_CONFIRM, TuiConfirmData } from "@taiga-ui/kit";

@Injectable({ providedIn: 'root' })
export class NotifyService {
    private alertService = inject(TuiAlertService);
    private dialogService = inject(TuiDialogService);

    public notifySuccess(title: string = "Success", message: string = "success", duration: number = 2000): void {
        this.alertService.open(`<span class="success-message">${message}</span>`, {
            label: title,
            appearance: 'positive',
            autoClose: duration
        }).subscribe();
    }

    public notifyError(title: string = "Error", message: string = "error", duration: number = 2000): void {
        this.alertService.open(`<span class="error-message">${message}</span>`, {
            label: title,
            appearance: 'negative',
            autoClose: duration
        }).subscribe();
    }

    public showConfirmDialog(title: string, message: string, action: () => void): void {
        const data: TuiConfirmData = {
            content: message,
            appearance: 'primary-destructive',
            yes: 'Yes',
            no: 'No'
        };
        this.dialogService.open<boolean>(TUI_CONFIRM, {
            label: title,
            size: 'm',
            data: data
        }).subscribe(
            {
                next: (confirm: boolean) => {
                    if (confirm) {
                        action();
                    }
                }
            }
        );
    }

    public showInfoDialog(title: string, message: string, style: string): void {
        this.dialogService.open(`<span class="${style}">${message}</span>`, {
            label: title,
            size: 'm'
        }).subscribe();
    }
}