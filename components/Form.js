import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import Head from 'next/head';

import { v4 as uuid } from "uuid";
import { ExpTrackCon } from "./Context/Context";
import { incomeCategories, expenseCategories } from "../Constants/categories";

import formatDate from "../lib/utils/formatDate";
import { useContext, useState } from "react";
import { useUser } from "@lib/firebase/useUser";
import { useEffect } from "react";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () => {
  const [formData, setFormData] = useState(initialState);
  const {user} = useUser();

  const { addTrans,transaction} = useContext(ExpTrackCon);

  const createTrans = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;

    const transactionList = {
      ...formData,
      amount: Number(formData.amount),
      id: uuid(),
    };
    
    addTrans(transactionList);
    setFormData(initialState);

  };
  useEffect(()=>{
  console.log("formdfata======",transaction);
  const registerExpense = () => fetch(`/api/addExpense?id=${encodeURIComponent(user && user.id)}&data=${JSON.stringify(transaction)}`)
    registerExpense()
},[transaction])

  const selectedCat =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography style={{ margin: 20 }}></Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {selectedCat.map((cat, index) => (
                <MenuItem key={index} value={cat.type}>
                  {cat.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            type="number"
            label="number"
            fullWidth
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            type="date"
            label="date"
            fullWidth
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: formatDate(e.target.value) })
            }
          />
        </Grid>

        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: 20, color: "#fff", backgroundColor: "navy" }}
          onClick={createTrans}
        >
          Track
        </Button>
      </Grid>
    </div>
  );
};

export default Form;
