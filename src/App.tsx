import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { sendAttackCmd, sendStartBattleCmd } from './Services/battle';
import BattleView from './Components/BattleView';
function App(): React.ReactElement {
  function handleClickAddBattle() {
    sendStartBattleCmd(1);
  }
  function handleClickAttack() {
    sendAttackCmd();
  }

  return (
    <div className="App">
      <BattleView />
      <Button variant="contained" color="primary" onClick={handleClickAddBattle}>
        Start
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClickAttack}>
        Attack
      </Button>
    </div>
  );
}

export default App;
