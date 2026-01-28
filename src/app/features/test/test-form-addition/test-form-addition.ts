import { Component, computed, inject, signal } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-test-form-addition',
  imports: [],
  templateUrl: './test-form-addition.html',
  styleUrl: './test-form-addition.css',
})
export class TestFormAddition {
  private readonly location = inject(Location);
  private userId_ = signal<number | null>(null);

  protected readonly userId = computed(() => this.userId_());

  constructor() {
    const state = this.location.getState() as { [key: string]: any };
    this.userId_.set(state?.['userId'] ?? null);
    console.log(this.userId_());
  }

}
