import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, Typography, CardContent, Divider, Grid } from "@material-ui/core";

import Form from './Form';
import ListTrack from './ListTrack';

const useStyles = makeStyles({
  parent: {},
  title: {
    fontSize: 14,
  },
  track: {
    width: 370,
    height: 500,
    overflowY: 'scroll',
    padding: 20,
  },
});

const CardTrack = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.parent}>
      <Card className={classes.track} variant="outlined">

        <CardHeader title={props.title} subheader="Powered by Speechly"/>

        <CardContent>
          <Typography align="center">Total Expense = 100$</Typography>
        </CardContent>

        <Divider />
        <Form />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ListTrack />
            </Grid>
          </Grid>
        </CardContent>
        
      </Card>
    </div>
  );
};

export default CardTrack;
