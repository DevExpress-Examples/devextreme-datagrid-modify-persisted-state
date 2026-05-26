import { useCallback } from 'react';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';
import {
  DataGrid,
  Column,
  Selection,
  FilterRow,
  GroupPanel,
  Pager,
  StateStoring,
} from 'devextreme-react/data-grid';
import type { Properties as DataGridProperties } from 'devextreme/ui/data_grid';
import { orders } from './data';

const storageKey = 'datagrid-state';
const allowedPageSizes: DataGridProperties['pager']['allowedPageSizes'] = [5, 10, 20];

function App(): JSX.Element {
  const loadState = useCallback(() => JSON.parse(localStorage.getItem(storageKey) as string) as object | null, []);
  const saveState = useCallback((state: object | null) => {
    if (state) {
      const columns = (state as { columns?: { filterValue?: unknown }[] }).columns;
      if (columns) {
        for (const col of columns) {
          col.filterValue = null;
        }
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
        showBorders={true}
      >
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
