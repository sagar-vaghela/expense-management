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
} from "devextreme-react/data-grid";
import { child, get, onValue, ref, update } from "firebase/database";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Id = () => {
  const router = useRouter();
  console.log("cbnjdhbchb", router.query);
  const {id: ID, pid } = router.query;
  const [totalExpenseData, setTotalExpenseData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const { user } = useUser();
  let dataGrid = useRef();

  useEffect(() => {
    if (user) {
      const getExpenses = (count) => {
        let expenses = count.val();
        console.log("expense", expenses);
        for (const expense in expenses) {
          let data = [];

          Object.values(expenses).forEach((item, i) => {
            data.push({ id: i + 1, ...item });
          });
          setTotalExpenseData(data);
          let tdata = data.filter((i) => i.user == pid)[0]?.transaction;
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
let a ;
  const saveChangeHandler = (e) => {
    console.log(e);
    if(e.changes[0].type !== 'remove'){
      let data = e.changes[0].data
      let changedKey = e.changes[0].key
      get(child(ref(realDB), 'expense/')).then((snapshot)=>{
        if(snapshot.exists()){
           a = snapshot.val()
           let key = Object.keys(a)[ID] 
           let transaction = [];
           //console.log(key,"object",  a[key].transaction = a[key].transaction.filter(i=>i.id === changedKey)[0] = [data]);
           a[key].transaction = a[key].transaction.forEach((t)=>{
                if(t.id === changedKey){
                  t = data
                }
                transaction.push(t);
           })
           a[key].transaction = transaction
           //console.log(a,"aaaaaaaaaaaaa", data, changedKey, a[key].transaction = transaction);
           //console.log("final------------------------------------", a);
           update(ref(realDB, 'expense/'),{...a});
        }
      })
    }else if(e.changes[0].type === 'remove'){
      let data = e.changes[0].data
      let changedKey = e.changes[0].key
      get(child(ref(realDB), 'expense/')).then((snapshot)=>{
        if(snapshot.exists()){
           a = snapshot.val()
           let key = Object.keys(a)[ID] 
           let transaction = [];
           //console.log(key,"object",  a[key].transaction = a[key].transaction.filter(i=>i.id === changedKey)[0] = [data]);
           a[key].transaction = a[key].transaction.forEach((t)=>{
                if(t.id !== changedKey){
                  
                  transaction.push(t);
                }
           })
           a[key].transaction = transaction
           //console.log(a,"aaaaaaaaaaaaa", data, changedKey, a[key].transaction = transaction);
           console.log("final------------------------------------", a);
           update(ref(realDB, 'expense/'),{...a});
        }
      })
    }
  };

  return (
    <Layout>
      <p className="mb-16 text-3xl font-bold text-gray-700">
        Expense Data of : <h1>{pid}</h1>{" "}
      </p>
      {expenseData ? (
        <DataGrid
          id="gridContainer"
          ref={(ref) => {
            dataGrid = ref;
          }}
          dataSource={expenseData}
          keyExpr="id"
          showBorders={true}
          allowColumnResizing={true}
          allowColumnReordering={true}
          onSaved={(e) => saveChangeHandler(e)}
        >
          <Editing
            mode="row"
            useIcons={true}
            allowUpdating={true}
            allowDeleting={true}
          />
          <Column type="buttons" width={110}>
          <Button name="edit"/>
          <Button name="delete" />
        </Column>
          <Column dataField="amount" />
          <Column dataField="category" />
          <Column dataField="date" />
          <Column dataField="type" />
          <GroupPanel visible={true} />
          <FilterRow
            visible={state.showFilterRow}
            applyFilter={state.currentFilter}
          />
          <HeaderFilter visible={state.showHeaderFilter} />
          <SearchPanel visible={true} width={240} placeholder="Search..." />
        </DataGrid>
      ) : (
        <div>No Data Found</div>
      )}
    </Layout>
  );
};

export default Id;
