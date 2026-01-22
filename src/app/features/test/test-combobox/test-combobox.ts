import { Component } from '@angular/core';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiComboBox, TuiDataListWrapper, TuiFilterByInputPipe } from "@taiga-ui/kit";
import { ReactiveFormsModule, FormControl } from "@angular/forms";

@Component({
  selector: 'app-test-combobox',
  imports: [TuiTextfield, TuiChevron, TuiComboBox, ReactiveFormsModule, TuiDataListWrapper, TuiFilterByInputPipe],
  templateUrl: './test-combobox.html',
  styleUrl: './test-combobox.css',
})
export class TestCombobox {
  protected readonly countries = ["USA", "Germany", "France", "Italy", "Spain"];

  protected country = new FormControl<string | null>(this.countries[0]);

}
