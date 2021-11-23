import { useCallback } from 'react';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';

import {
    DataGrid,
    Column,
    Selection,
    FilterRow,
    GroupPanel,
    Pager,
    StateStoring
} from 'devextreme-react/data-grid';
import { orders } from './data';

const storageKey = "datagrid-state";
const allowedPageSizes = [5, 10, 20];

function App() {
    const loadState = useCallback(() => {
        return JSON.parse(localStorage.getItem(storageKey));
    }, []);

    const saveState = useCallback((state) => {
        if (state) {
            for (let i = 0; i < state.columns.length; i++) {
                state.columns[i].filterValue = null;
            }
        }
        localStorage.setItem(storageKey, JSON.stringify(state));
    }, []);
    
    return (
        <div className="App">
            <DataGrid
                dataSource={orders}
                keyExpr="ID"
                allowColumnResizing={true}
                allowColumnReordering={true}
                showBorders={true}>
                <Column dataField="OrderNumber" caption="Invoice Number" width={130} />
                <Column dataField="OrderDate" sortOrder="desc" dataType="date" />
                <Column dataField="SaleAmount" alignment="right" format="currency" />
                <Column dataField="Employee" />
                <Column dataField="CustomerStoreCity" caption="City" />
                <Column dataField="CustomerStoreState" caption="State" groupIndex={0} />
                <Selection mode="single" />
                <FilterRow visible={true} />
                <GroupPanel visible={true} />
                <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} />
                <StateStoring
                    enabled={true}
                    type="custom"
                    storageKey={storageKey}
                    customLoad={loadState}
                    customSave={saveState}
                />
            </DataGrid>
        </div>
    );
}

export default App;
