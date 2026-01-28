import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TuiTextfield, TuiError, TuiCalendar, tuiDateFormatProvider } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiInputDate } from '@taiga-ui/kit';
import { TuiForm } from "@taiga-ui/layout";
import { Observable } from 'rxjs';
import { Button } from "../../../shared/button/button";
import { RouterOutlet, Router } from '@angular/router';

interface TestFormModel {
  name: FormControl<string | null>;
  confirmName: FormControl<string | null>;
  age: FormControl<number | null>;
  birthDate: FormControl<Date | null>;
  country: FormControl<string | null>;
}

@Component({
  selector: 'app-test-form',
  imports: [ReactiveFormsModule, TuiForm, TuiTextfield, TuiError, TuiFieldErrorPipe, AsyncPipe, TuiCalendar, TuiInputDate, Button, RouterOutlet],
  templateUrl: './test-form.html',
  styleUrl: './test-form.css',
  providers: [tuiDateFormatProvider({ mode: "DMY", separator: "-" })],
})
export class TestForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  unMatchedName: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const name = control.get('name');
    const confirmName = control.get('confirmName');

    if (name?.value !== confirmName?.value) {
      return { unMatchedName: true };
    }

    return null;
  }

  testForm = this.fb.group<TestFormModel>({
    name: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
    confirmName: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
    age: this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    birthDate: this.fb.control(null),
    country: this.fb.control(null, [Validators.required]),
  },
    { validators: [this.unMatchedName] });

  private autoIncrementAge = new Observable<number>(subscriber => {
    let age = 0;
    subscriber.next(age);
    let interval = setInterval(() => { age++; subscriber.next(age); }, 1000);

    return () => { clearInterval(interval); };
  });

  protected readonly startIncrementAge: () => void = () => {
    const subscription = this.autoIncrementAge.subscribe((age: number) => {
      this.testForm.controls.age.setValue(age); if (age >= 10)
        subscription.unsubscribe();
    });
  }

  protected readonly openAddition: () => void = () => {
    this.router.navigate(['test/form/addition'],
      { state: { userId: 20 } }
    );
  };
}
