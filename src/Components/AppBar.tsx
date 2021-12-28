import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import { useLocation } from 'react-router-dom';
import { Theme } from '@mui/material/styles';
import { createStyles } from '@mui/styles';
import { AppBar, Tab, Tabs } from '@mui/material';

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

  let route = location.pathname;
  if (location.pathname.startsWith('/battle')) {
    route = '/battle';
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Tabs
          value={route}
          variant="standard"
          aria-label="nav tabs example"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab value="/monster" label="Monsters" href="/monster"></Tab>
          <Tab value="/battle" label="Battles" href="/battle"></Tab>
          <Tab component="a" value={2} label="Messages"></Tab>
        </Tabs>
      </AppBar>
    </div>
  );
}
