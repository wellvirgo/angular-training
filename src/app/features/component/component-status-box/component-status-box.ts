import { Component, inject, input, output } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { DetailComponentRes } from '../../../core/dto/component/component-res';
import { NotifyService } from '../../../shared/notification/notify-service';
import { ValidationResult } from '../../../shared/validators/validation-result';

@Component({
  selector: 'app-component-status-box',
  imports: [Button],
  templateUrl: './component-status-box.html',
  styleUrl: './component-status-box.css',
})
export class ComponentStatusBox {
  private notifyService = inject(NotifyService);
  isUpdatable = output<string>();

  selectedComponents = input<DetailComponentRes[]>([]);
  statusList = new Set<number>();

  protected updateStatus(status: string): void {
    const validationResult = this.checkCanUpdateStatus();
    if (!validationResult.isValid) {
      this.notifyService.showInfoDialog('Cannot Update Status', validationResult?.message ?? 'Please check the status of selected components.', 'error-message-big');
      return;
    }

    this.isUpdatable.emit(status);
  }

  private checkCanUpdateStatus(): ValidationResult {
    if (this.selectedComponents().length === 0)
      return { isValid: false, message: 'No components selected.' };

    if (this.distinctStatusList(this.selectedComponents()).size > 1)
      return { isValid: false, message: 'Selected components have different statuses.' };

    return { isValid: true };
  }

  private distinctStatusList(components: DetailComponentRes[]): Set<number> {
    this.statusList.clear();
    components.forEach(component => this.statusList.add(component.status.value));
    return this.statusList;
  }
}
