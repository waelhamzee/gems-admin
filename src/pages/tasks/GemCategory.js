import React, { useEffect, useState } from "react";
import {
  DataGrid,
  Editing,
  Column,
  RemoteOperations,
  Grouping,
  GroupPanel,
  Paging,
  Pager,
  FilterRow,
  ColumnFixing,
  SearchPanel,
  HeaderFilter,
  Export,
  Scrolling,
} from "devextreme-react/data-grid";
import "bootstrap/dist/css/bootstrap.min.css";
import { RequiredRule } from "devextreme-react/validator";
import "./index.css";
import Axios from "axios";
import Constants from "../../core/serverurl";
import { useLocation } from 'react-router-dom'

function GemCategory() {
    const [data,setData] = useState()
    const location = useLocation();
  useEffect(() => {
      let category;
      if (location.pathname === '/diamonds') {
          category = 'Diamonds'
      } else if (location.pathname === '/opals') {
        category = 'Opals'
    } else if (location.pathname === '/rough') {
        category = 'Rough'
    } else if (location.pathname === '/semi') {
        category = 'Semi-Precious Gems'
    } else if (location.pathname === '/precious') {
        category = 'Precious Gems'
    }else if (location.pathname === '/pearls') {
        category = 'Pearls'
    } else if (location.pathname === '/other') {
        category = 'Other'
    }
    if (!navigator.onLine) {
      const data = JSON.parse(localStorage.getItem(category))
         setData(data)
    } else {
    Axios.post(`${Constants.serverlink}getcategory`, {
        category : category
    }, {
      headers : {
        "token" : localStorage.getItem('token')
      }
    }).then((response) => {
       localStorage.setItem(category, JSON.stringify(response.data))
       setData(response.data);
    });
  }
  }, []);



  return (
    <div style={{padding: '10px'}}>
      <DataGrid
        dataSource={data}
        id="grid-container"
        className={"dx-card wide-card .dx-swatch-additional"}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
      >
        <Scrolling columnRenderingMode="virtual" />
        <RemoteOperations groupPaging={true} />
        <Paging defaultPageSize={10} />
        <Export enabled={true}/>
        <Pager
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
          // displayMode={"full"}
        />
        <HeaderFilter visible={true} />
        <ColumnFixing enabled={true} />
        <FilterRow visible={true} />
        <SearchPanel visible={true} />
        <Column dataField="Category" caption="Category">
          <RequiredRule />
        </Column>
        <Column dataField="TypeofGem" caption="Type of Gem">
          <RequiredRule />
        </Column>
        <Column dataField="Quantity" dataType={"number"}>
          <RequiredRule />
        </Column>
        <Column dataField="Formation" caption="Formation">
          <RequiredRule />
        </Column>
        <Column dataField="Shape">
          <RequiredRule />
        </Column>
        <Column dataField="MineSource" caption="Mine Source">
          <RequiredRule />
        </Column>
        <Column dataField="Weight" >
          <RequiredRule />
        </Column>
        <Column dataField="Color" caption="Color">
          <RequiredRule />
        </Column>
        <Column dataField="ColorIntensity" caption="Color Intensity">
          <RequiredRule />
        </Column>
        <Column dataField="Shades">
          <RequiredRule />
        </Column>
        <Column dataField="Clarity" caption="Clarity">
          <RequiredRule />
        </Column>
          <Column dataField="Length" caption="Length">
            <RequiredRule />
          </Column>
          <Column dataField="Width" caption="Width">
            <RequiredRule />
          </Column>
          <Column dataField="Depth" caption="Depth">
            <RequiredRule />
          </Column>
        {/* </Column> */}
        <Column
          dataField="Costperpiece"
          caption={"Cost (per piece)"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="Costpercarat"
          caption={"Cost (per carat)"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="TotalCost"
          caption={"Total Cost"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="Priceperpiece"
          caption={"Selling Price (per piece)"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="Pricepercarat"
          caption={"Selling Price (per carat)"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="TotalPrice"
          caption={"Total Price"}
        >
          <RequiredRule />
        </Column>
        <Column dataField="Enhancement">
          <RequiredRule />
        </Column>
        <Column dataField="QualityGrade" caption="Quality Grade">
          <RequiredRule />
        </Column>
        <Column dataField="Description" width={150}>
          <RequiredRule />
        </Column>
        {/* <Column dataField="Quantity" dataType={"number"}>
          <RequiredRule />
        </Column> */}
        <Column
          dataField="StockNumber"
          caption={"Stock Number"}
          dataType={"number"}
        >
          <RequiredRule />
        </Column>
      </DataGrid>
    </div>
  );
}

export default GemCategory;

