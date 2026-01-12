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

export function updateDateMustInFutureDate(control: AbstractControl): ValidationErrors | null {
    const inputDate = control.value;
    if (!inputDate) return null;
    if (control.pristine) return null;

    const today = TuiDay.currentLocal();
    if (today.dayAfter(inputDate)) {
        return {
            updateDateMustInFutureDate: { invalidDate: inputDate.toString() }
        };
    }

    return null;
}