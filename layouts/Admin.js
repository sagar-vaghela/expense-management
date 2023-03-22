import Layout from "./admin/components/Layout";
import DataGrid, {
  Column,
  FilterRow,
  GroupPanel,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { useRef } from "react";
import { useUser } from "@lib/firebase/useUser";
import { onValue, ref } from "firebase/database";
import { realDB } from "@lib/firebase/initFirebase";
import { useState } from "react";
import { useEffect } from "react";

const Admin = ({ data }) => {
  let dataGrid = useRef();
  const [contactsData, setContactsData] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      const onCountIncrease = (count) => {
        let contacts = count.val();
        for (const contact in contacts) {
          let data = [];
          Object.values(contacts).forEach((item, i) =>
            data.push(item.ContactData)
          );
          setContactsData(data);
        }
      };

      const fetchData = async () => {
        const countRef = ref(realDB, "contacts/");
        onValue(countRef, onCountIncrease);
      };

      fetchData();
    }
  }, [user]);

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

  return (
    <Layout>
      <p className="mb-16 text-3xl font-bold text-gray-700">Contacts Data</p>
      {contactsData ? <DataGrid
        id="gridContainer"
        ref={(ref) => {
          dataGrid = ref;
        }}
        dataSource={contactsData}
        keyExpr="email"
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
      >
      <GroupPanel visible={true} />
        <FilterRow
          visible={state.showFilterRow}
          applyFilter={state.currentFilter}
        />
        <HeaderFilter visible={state.showHeaderFilter} />
        <SearchPanel visible={true} width={240} placeholder="Search..." />
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
