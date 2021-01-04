import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import BattleView from './Components/BattleView';
import AppBar from './Components/AppBar';
import NotificationBar from './Components/NotificationBar';
import store from './Store/store';
import { createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import { addNotificationCreator } from './Store/notificationStore';
function App(): React.ReactElement {
  function handleClick() {
    store.dispatch(addNotificationCreator('hallo bob'));
  }
  return (
    <div className="App">
      <NotificationBar />
      <AppBar></AppBar>
      <BattleView />
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
}

export default App;
