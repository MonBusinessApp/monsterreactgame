import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function ButtonAppBar(): React.ReactElement {
  const classes = useStyles();
  const location = useLocation();

  console.log(location.pathname);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={location.pathname} variant="standard" aria-label="nav tabs example">
          <Tab value="/monster" label="Monsters" href="/monster"></Tab>
          <Tab value="/battle" label="Battles" href="/battle"></Tab>
          <Tab component="a" value={2} label="Messages"></Tab>
        </Tabs>
      </AppBar>
    </div>
  );
}
