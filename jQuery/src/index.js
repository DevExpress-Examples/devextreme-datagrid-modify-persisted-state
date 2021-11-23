$(function () {
    const storageKey = 'datagrid-state';

    $('#gridContainer').dxDataGrid({
        dataSource: orders,
        keyExpr: 'ID',
        columns: [{
            dataField: 'OrderNumber',
            width: 130,
            caption: 'Invoice Number',
        }, {
            dataField: 'OrderDate',
            dataType: 'date',
            sortOrder: 'desc',
        }, {
            dataField: 'SaleAmount',
            alignment: 'right',
            format: 'currency',
        },
        'Employee', {
            caption: 'City',
            dataField: 'CustomerStoreCity',
        }, {
            caption: 'State',
            dataField: 'CustomerStoreState',
            groupIndex: 0,
        }],
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        selection: {
            mode: 'single',
        },
        filterRow: {
            visible: true,
        },
        groupPanel: {
            visible: true,
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
        },
        stateStoring: {
            enabled: true,
            type: 'custom',
            storageKey: storageKey,
            customLoad() {
                return JSON.parse(localStorage.getItem(storageKey));
            },
            customSave(state) {
                if (state) {
                    for (let i = 0; i < state.columns.length; i++) {
                        state.columns[i].filterValue = null;
                    }
                }
                localStorage.setItem(storageKey, JSON.stringify(state));
            }
        }
    });
});