<template>
  <DxDataGrid
    :data-source="orders"
    key-expr="ID"
    :allow-column-resizing="true"
    :allow-column-reordering="true"
    :show-borders="true"
  >
    <DxColumn
      :width="130"
      data-field="OrderNumber"
      caption="Invoice Number"
    />
    <DxColumn
      data-field="OrderDate"
      sort-order="desc"
      data-type="date"
    />
    <DxColumn
      data-field="SaleAmount"
      alignment="right"
      format="currency"
    />
    <DxColumn data-field="Employee"/>
    <DxColumn
      data-field="CustomerStoreCity"
      caption="City"
    />
    <DxColumn
      :group-index="0"
      data-field="CustomerStoreState"
      caption="State"
    />
    <DxSelection mode="single"/>
    <DxFilterRow :visible="true"/>
    <DxGroupPanel :visible="true"/>
    <DxPager
      :show-page-size-selector="true"
      :allowed-page-sizes="[5, 10, 20]"
    />
    <DxStateStoring
      :enabled="true"
      type="custom"
      :storage-key="storageKey"
      :custom-load="loadState"
      :custom-save="saveState"
    />
  </DxDataGrid>
</template>

<script setup lang="ts">
import {
  DxDataGrid,
  DxColumn,
  DxSelection,
  DxFilterRow,
  DxGroupPanel,
  DxPager,
  DxStateStoring,
} from 'devextreme-vue/data-grid';
import { orders } from '../data';

defineOptions({ name: 'HomeContent' });

const storageKey = 'datagrid-state';

function loadState() {
  return JSON.parse(localStorage.getItem(storageKey) as string) as object | null;
}

function saveState(state: object | null): void {
  if (state) {
    const columns = (state as { columns?: { filterValue?: unknown }[] }).columns;
    if (columns) {
      for (const col of columns) {
        col.filterValue = null;
      }
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(state));
}
</script>
