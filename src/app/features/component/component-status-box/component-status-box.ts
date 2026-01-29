import { Component, effect, inject, input, output } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { DetailComponentRes } from '../../../core/dto/component/component-res';
import { NotifyService } from '../../../shared/notification/notify-service';

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
    if (!this.checkCanUpdateStatus()) {
      this.notifyService.showInfoDialog('Cannot Update Status', 'Please select components with the same status to update.', 'error-message');
      return;
    }

    this.isUpdatable.emit(status);
  }

  private checkCanUpdateStatus(): boolean {
    if (this.selectedComponents().length === 0)
      return false;

    if (this.distinctStatusList(this.selectedComponents()).size > 1)
      return false;


    return true;
  }

  private distinctStatusList(components: DetailComponentRes[]): Set<number> {
    this.statusList.clear();
    components.forEach(component => this.statusList.add(component.status.value));
    return this.statusList;
  }
}
