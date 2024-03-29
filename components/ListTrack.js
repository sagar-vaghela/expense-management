import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Slide,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Delete, MoneyOff } from "@material-ui/icons";

import { ExpTrackCon } from "./Context/Context";

const useStyles = makeStyles({
  avatarInc: { backgroundColor: "navy" },
  avatarExp: { backgroundColor: "orange" },
  slide: { overflowY: "scroll" },
});

const ListTrack = ({FBExpenseData}) => {
  const classes = useStyles();
  const { deleteTrans, removeAll, transaction } = React.useContext(ExpTrackCon);
  const {income, expense, ...expenseList} = FBExpenseData !== null && FBExpenseData

  console.log(transaction, "transaction-----------------0000000000", expenseList.transaction);

  return (
    <div>
      {transaction.length > 0 ? (
        <Button
          onClick={removeAll}
          variant="outlined"
          style={{ marginLeft: 185, width: '120px' }}
        >
          Delete All
        </Button>
      ) : null}
      <List dense={false}>
        {expenseList && expenseList.transaction?.map((data, index) => (
          <div key={index}>
            <Slide direction="down" in mountOnEnter unmountOnExit>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    className={
                      data.type === "Income"
                        ? classes.avatarInc
                        : classes.avatarExp
                    }
                  >
                    <MoneyOff />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={data.category}
                  secondary={`₹ ${data.amount} - ${data.date}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTrans(data.id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Slide>
          </div>
        ))}
      </List>
    </div>
  );
};

export default ListTrack;
