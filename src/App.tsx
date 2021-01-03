import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { sendAttackCmd, sendStartBattleCmd } from './Services/battle';
import BattleView from './Components/BattleView';
import AppBar from './Components/AppBar';
import { Container } from '@material-ui/core';
function App(): React.ReactElement {
  return (
    <div className="App">
      <AppBar></AppBar>
      <BattleView />
    </div>
  );
}

export default App;
