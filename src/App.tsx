import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import BattleView from './Components/BattleView';
import AppBar from './Components/AppBar';
import NotificationBar from './Components/NotificationBar';
import store from './Store/store';

import { createAddNotification } from './Store/notificationStore';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(): React.ReactElement {
  function handleClick() {
    store.dispatch(createAddNotification('hallo bob'));
  }
  return (
    <div className="App">
      <NotificationBar />

      <Router>
        <AppBar></AppBar>
        <Switch>
          <Route path="/battle">
            <BattleView />
          </Route>
        </Switch>
      </Router>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
}

export default App;
