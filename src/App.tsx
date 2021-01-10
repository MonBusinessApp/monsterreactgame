import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import BattleView from './Components/BattleView';
import AppBar from './Components/AppBar';
import NotificationBar from './Components/NotificationBar';
import store, { RootState } from './Store/store';

import { createAddNotification } from './Store/notificationStore';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MonsterListView from './Components/MonsterListView';

function App(): React.ReactElement {
  function handleClick() {
    store.dispatch(createAddNotification('hallo bob'));
  }

  const authState = useSelector((state: RootState) => state.auth);
  if (authState.type == 'loggedOut') {
    return <div>Not logged in!! TODO</div>;
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
          <Route path="/monster">
            <MonsterListView userId={authState.userId} />
          </Route>
        </Switch>
      </Router>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
}

export default App;
