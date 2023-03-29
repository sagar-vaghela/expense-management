import Layout from "./admin/components/Layout";
import DataGrid, {
  Column,
  Editing,
  FilterRow,
  GroupPanel,
  HeaderFilter,
  SearchPanel,
  Selection,
} from "devextreme-react/data-grid";
import { useRef } from "react";
import { useUser } from "@lib/firebase/useUser";
import { child, get, onValue, ref, set, update } from "firebase/database";
import { realDB } from "@lib/firebase/initFirebase";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "devextreme-react";

const Admin = ({ data }) => {
  let dataGrid = useRef();
  const [contactsData, setContactsData] = useState([]);
  const [totalExpenseData, setTotalExpenseData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const { user } = useUser();
 const router =  useRouter();

  useEffect(() => {
    if (user) {
      const onCountIncrease = (count) => {
        let contacts = count.val();
        for (const contact in contacts) {
          let data = [];
          Object.values(contacts).forEach((item, i) =>
            data.push({id: i+1, ...item.ContactData})
          );
          setContactsData(data);
        }
      };

      const getExpenses = (count) => {
        let expenses = count.val();
       console.log("expense", expenses);
       for (const expense in expenses) {
        let data = [];
        let tdata = [];

        Object.values(expenses).forEach((item, i) =>{
          data.push({id: i+1 ,...item})
          if(item.transaction) {tdata.push(item.transaction)}}
        );
        console.log(data,"data", tdata);
        setTotalExpenseData(data);
        setExpenseData(tdata);
      }
      };


      const fetchData = async () => {
        const countRef = ref(realDB, "contacts/");
        const expenseRef = ref(realDB, "expense/");
        onValue(countRef, onCountIncrease);
        onValue(expenseRef, getExpenses);
      };

      fetchData();
    }
  }, [user]);


  const rowClickHandler = (e) => {
    console.log("event", e);
  }

  console.log("contactsData", contactsData);
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

  let a;

  const saveChangeHandler = (e) => {
    console.log(e.changes[0]);
    let changedKey = e.changes[0].key
    if(e.changes[0].type !== 'remove'){
      let data = e.changes[0].data
      get(child(ref(realDB), 'contacts/')).then((snapshot)=>{
        if(snapshot.exists()){
           a = snapshot.val()
           let keys = Object.keys(a)
           let key = keys[changedKey -1]
           let contactsArray = []
           a[key].ContactData = data
           let b = Object.values(a).forEach(i=> contactsArray.push(i.ContactData))
           update(ref(realDB, 'contacts/'),{...a});
        }
      })
     
    }else if(e.changes[0].type === 'remove'){
      let data = e.changes[0].data
      get(child(ref(realDB), 'contacts/')).then((snapshot)=>{
        if(snapshot.exists()){
           a = snapshot.val()
           console.log(a,"aaaaaaaaaaaaaaaaa");
           let keys = Object.keys(a)
           let key = keys[changedKey -1]
           a[key] = {}
           let b = a
           update(ref(realDB, 'contacts/'),{...a});
        }
      })
    }
      
    
  }

  return (
    <Layout>
      <p className="mb-16 text-3xl font-bold text-gray-700">Contacts Data</p>
      {contactsData ? <DataGrid
        id="gridContainer"
        ref={(ref) => {
          dataGrid = ref;
        }}
        dataSource={contactsData}
        keyExpr="id"
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        onSaved={(e)=>saveChangeHandler(e)}
      >
      <Editing
          mode="row"
          useIcons={true}
          allowUpdating={true}
          allowDeleting={true} />
      <GroupPanel visible={true} />
        <FilterRow
          visible={state.showFilterRow}
          applyFilter={state.currentFilter}
        />
        <HeaderFilter visible={state.showHeaderFilter} />
        <SearchPanel visible={true} width={240} placeholder="Search..." />
        <Column type="buttons" width={110}>
          <Button name="edit"/>
          <Button name="delete" />
        </Column>
          <Column dataField="id" />
          <Column dataField="email" />
          <Column dataField="message" />
          <Column dataField="name" />
          <Column dataField="subject" />
      </DataGrid> : <div>No Data Found</div>}
      <div className="mb-16 grid gap-5 lg:grid-cols-3">
        <div className="h-40 rounded bg-white shadow-sm"></div>
        <div className="h-40 rounded bg-white shadow-sm"></div>
        <div className="h-40 rounded bg-white shadow-sm"></div>
      </div>
      <div className="col-1 grid h-96 bg-white shadow-sm"></div>
    </Layout>
  );
};

export default Admin;
