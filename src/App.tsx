import React from 'react';
import './App.css';
import BattleView from './Components/Battle';
import Button from '@material-ui/core/Button';
import { useStore } from 'react-redux';
import { sendAttackCmd, sendStartBattleCmd } from './Services/battle';
function App(): React.ReactElement {
  const store = useStore();

  function handleClickAddBattle() {
    sendStartBattleCmd(1);
  }
  function handleClickAttack() {
    sendAttackCmd();
  }

  return (
    <div className="App">
      <BattleView></BattleView>
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
