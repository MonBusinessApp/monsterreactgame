import React from 'react';
import { RootState } from '../Store/store';
import { useSelector } from 'react-redux';
import BattleTeam from './BattleTeam';
import { Grid } from '@material-ui/core';

function Battle(): React.ReactElement {
  const battleState = useSelector((state: RootState) => state.battle);
  console.log(battleState);

  const firstBattle = battleState.battles[0];

  return (
    <Grid container className="FirstBattle" spacing={3}>
      {firstBattle.teams.map((tId: number) => (
        <Grid item xs={6} key={tId}>
          <BattleTeam teamId={tId} key={tId}></BattleTeam>
        </Grid>
      ))}
    </Grid>
  );
}

export default Battle;
