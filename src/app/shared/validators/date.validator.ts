import { AbstractControl, ValidationErrors } from "@angular/forms";
import { TuiDay } from "@taiga-ui/cdk";

export function mustInFutureDate(control: AbstractControl): ValidationErrors | null {
    const inputDate = control.value;
    if (!inputDate) return null;

    const today = TuiDay.currentLocal();

    if (today.dayAfter(inputDate)) {
        return {
            mustInFutureDate: { invalidDate: inputDate.toString() }
        };
    }

    return null;
}