import { Component } from '@angular/core';
import { Order, Service } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [Service]
})
export class AppComponent {
    orders: Order[];
    storageKey: string = "datagrid-state";

    constructor(private service: Service) {
        this.orders = service.getOrders();
    }
    loadState() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }
    saveState(state) {
        if (state) {
            for (let i = 0; i < state.columns.length; i++) {
                state.columns[i].filterValue = null;
            }
        }
        localStorage.setItem(this.storageKey, JSON.stringify(state));
    }
}
