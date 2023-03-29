import Layout from "@layouts/admin/components/Layout";
import { realDB } from "@lib/firebase/initFirebase";
import { useUser } from "@lib/firebase/useUser";
import { Button, DataGrid } from "devextreme-react";
import {
    Column,
  Editing,
  FilterRow,
  GroupPanel,
  HeaderFilter,
  SearchPanel,
  Selection,
} from "devextreme-react/data-grid";
import { child, get, onValue, ref, set, update } from "firebase/database";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";


const TransactionData = () => {
  let dataGrid = useRef();
  const [totalExpenseData, setTotalExpenseData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const { user } = useUser();
  const router = useRouter()


  const applyFilterTypes = [
    {
      key: "auto",
      name: "Immediately",
    },
    {
      key: "onClick",
      name: "On Button Click",
    },
  ];

  const state = {
    showFilterRow: true,
    showHeaderFilter: true,
    currentFilter: applyFilterTypes[0].key,
  };

  useEffect(() => {
    if (user) {
      

      const getExpenses = (count) => {
        let expenses = count.val();
        console.log("expense", expenses);
        for (const expense in expenses) {
          let data = [];
          let tdata = [];

          Object.values(expenses).forEach((item, i) => {
            data.push({ id: i + 1, ...item });
            if (item.transaction) {
              tdata.push(item.transaction);
            }
          });
          console.log(data, "data", tdata);
          setTotalExpenseData(data);
          setExpenseData(tdata);
        }
      };

      const fetchData = async () => {
        const expenseRef = ref(realDB, "expense/");
        onValue(expenseRef, getExpenses);
      };

      fetchData();
    }
  }, [user]);

  const calculateCellValue = () => {
    return 'Click to View Transaction History'
  }

  const onSelectionChanged = (e) => {
    console.log(e,"qwerty");
    console.log(e.selectedRowsData[0].user);
    let a = e.selectedRowsData[0].user
    let id = e.selectedRowsData[0].id
    router.push(`transaction-data/${a}?id=${id-1}`)
  }
  let a;

 

  const saveChangeHandler = (e) => {
    console.log(e);
    if(e.changes[0].type !== 'remove'){
      let {id, ...rest} = e.changes[0].data
    
      get(child(ref(realDB), 'expense/')).then((snapshot)=>{
        if(snapshot.exists()){
           a = snapshot.val()
           let c = Object.keys(a)[e.changes[0].key - 1]
           a[c] = rest
           console.log(a,"aaaaaaaaaaaaa",c);
           update(ref(realDB, 'expense/'),{...a});
        }
      })
    }else if(e.changes[0].type === 'remove'){
      let {key} = e.changes[0]
      console.log(key,"key");
      get(child(ref(realDB), 'expense/')).then((snapshot)=>{
        if(snapshot.exists()){
           a = snapshot.val()
           let c = Object.keys(a)[key - 1]
           a[c] = {}
           console.log(a,"aaaaaaaaaaaaa",c);
           update(ref(realDB, 'expense/'),{...a});
        }
      })

    }
    
  }
  

  return (
    <Layout>
    <p className="mb-16 text-3xl font-bold text-gray-700">Expense Data</p>
      {totalExpenseData ? (
        <DataGrid
          id="gridContainer"
          ref={(ref) => {
            dataGrid = ref;
          }}
          dataSource={totalExpenseData}
          keyExpr="id"
          showBorders={true}
          allowColumnResizing={true}
          allowColumnReordering={true}
          onSelectionChanged={(e)=>onSelectionChanged(e)}
          onSaved={(e)=>saveChangeHandler(e)}
        >
        <Selection mode="single" />
          <GroupPanel visible={true} />
          <FilterRow
            visible={state.showFilterRow}
            applyFilter={state.currentFilter}
          />
          <HeaderFilter visible={state.showHeaderFilter} />
          <SearchPanel visible={true} width={240} placeholder="Search..." />
          <Editing
          mode="row"
          useIcons={true}
          allowUpdating={true}
          allowDeleting={true} />
          <Column type="buttons" width={110}>
          <Button name="edit"/>
          <Button name="delete" />
        </Column>
          <Column dataField="id" />
          <Column dataField="user" />
          <Column dataField="expense" />
          <Column dataField="income" />
          <Column caption='Transaction' calculateCellValue={calculateCellValue}></Column>
        </DataGrid>
        
      ) : (
        <div>No Data Found</div>
      )}
    </Layout>
  );
};

export default TransactionData;
