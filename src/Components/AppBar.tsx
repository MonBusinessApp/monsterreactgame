import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Tabs } from '@material-ui/core';
import { TabPanel } from '@material-ui/lab';
import { Tab } from '@material-ui/core';
import { Link } from '@material-ui/core';
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

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function ButtonAppBar() {
  const classes = useStyles();
  const location = useLocation();

  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

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
