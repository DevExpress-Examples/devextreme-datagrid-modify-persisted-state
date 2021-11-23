<template>
    <DxDataGrid
        :data-source="orders"
        key-expr="ID"
        :allow-column-resizing="true"
        :allow-column-reordering="true"
        :show-borders="true">
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
        <DxSelection mode="single" />
        <DxFilterRow :visible="true" />
        <DxGroupPanel :visible="true" />
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

<script>
import {
    DxDataGrid,
    DxColumn,
    DxSelection,
    DxFilterRow,
    DxGroupPanel,
    DxPager,
    DxStateStoring
} from 'devextreme-vue/data-grid';
import { orders } from '../data';

export default {
    name: 'Home',
    components: {
        DxDataGrid,
        DxColumn,
        DxSelection,
        DxFilterRow,
        DxGroupPanel,
        DxPager,
        DxStateStoring
    },
    data() {
        return {
            orders,
            storageKey: "datagrid-state"
        }
    },
    methods: {
        loadState() {
            return JSON.parse(localStorage.getItem(this.storageKey));
        },
        saveState(state) {
            if (state) {
                for (let i = 0; i < state.columns.length; i++) {
                    state.columns[i].filterValue = null;
                }
            }
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
