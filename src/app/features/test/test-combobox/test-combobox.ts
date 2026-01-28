import { Component, signal } from '@angular/core';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiComboBox, TuiDataListWrapper, TuiFilterByInputPipe } from "@taiga-ui/kit";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { TuiStringHandler } from '@taiga-ui/cdk';
import { Button } from "../../../shared/button/button";

interface Country {
  id: string;
  name: string;
}

@Component({
  selector: 'app-test-combobox',
  imports: [TuiTextfield, TuiChevron, TuiComboBox, ReactiveFormsModule, TuiDataListWrapper, TuiFilterByInputPipe, Button],
  templateUrl: './test-combobox.html',
  styleUrl: './test-combobox.css',
})
export class TestCombobox {
  protected readonly countries = signal<Country[]>([
    { id: 'us', name: 'United States' },
    { id: 'ca', name: 'Canada' },
    { id: 'mx', name: 'Mexico' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'fr', name: 'France' },
    { id: 'de', name: 'Germany' },
  ]);

  protected readonly stringify: TuiStringHandler<Country> = item => item.name;

  protected country = new FormControl<string | null>(null);


  protected changeOptions(): void {
    this.countries.set([
      { id: 'us', name: 'United States' },
      { id: 'jp', name: 'Japan' },
      { id: 'cn', name: 'China' },
      { id: 'in', name: 'India' },
      { id: 'br', name: 'Brazil' },
      { id: 'za', name: 'South Africa' },
    ]);
  }

}
