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
