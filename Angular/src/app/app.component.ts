import { Component } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import type { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Service, type Order } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [DxDataGridModule],
  providers: [Service],
})
export class AppComponent {
  orders: Order[];

  storageKey = 'datagrid-state';

  constructor(private service: Service) {
    this.orders = service.getOrders();
  }

  loadState = (): object | null => JSON.parse(localStorage.getItem(this.storageKey) as string) as object | null;

  saveState = (state: DxDataGridTypes.State | null): void => {
    if (state?.columns) {
      for (const col of state.columns) {
        (col as { filterValue?: unknown }).filterValue = null;
      }
    }
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  };
}
