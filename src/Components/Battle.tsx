import React from 'react';
import { RootState } from '../Store/store';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import BattleTeam from './BattleTeam';

function BattleView(): React.ReactElement {
  const battleState = useSelector((state: RootState) => state.battle);

  const firstBattle = battleState.battles[0];

  if (battleState.activeBattleUI == null) {
    return <div>No active Battle</div>;
  }
  return (
    <Grid container className="ActiveBattle" spacing={4}>
      {firstBattle.lineUps.map((l) => (
        <Grid item key={l.teamId} xs={6}>
          <BattleTeam teamId={l.teamId} battleId={firstBattle.id}></BattleTeam>
        </Grid>
      ))}
    </Grid>
  );
}

export default BattleView;
