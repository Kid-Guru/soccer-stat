import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid, makeStyles, Paper } from '@material-ui/core';

const UseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const competitions = () => {
  const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
      </Container>
    </div >
  )
}

export default competitions;