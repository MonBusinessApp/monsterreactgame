import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { AppBar, Tab, Tabs } from '@mui/material';

export default function ButtonAppBar(): React.ReactElement {
  const location = useLocation();

  let route = location.pathname;
  if (location.pathname.startsWith('/battle')) {
    route = '/battle';
  }
  return (
    <div>
      <AppBar position="static" color="primary">
        <Tabs
          value={route}
          variant="standard"
          aria-label="nav tabs example"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab value="/monster" label="Monsters" to="/monster" component={Link}></Tab>
          <Tab value="/battle" label="Battles" to="/battle" component={Link}></Tab>
          <Tab component="a" value={2} label="Messages"></Tab>
        </Tabs>
      </AppBar>
    </div>
  );
}
