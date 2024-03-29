import React from 'react';
import { RootState } from '../../Store/store';
import { useSelector } from 'react-redux';
import { Grid, Paper } from '@mui/material';
import MonsterView from './MonsterView';
import { battleSelectors } from '../../Store/battleStore';
import { red, blue } from '@mui/material/colors';
function BattleTeam({ teamId, battleId }: { teamId: number; battleId: number }): React.ReactElement {
  const battle = useSelector((state: RootState) => battleSelectors.selectById(state, battleId));

  const myMonsters = battle?.teams.filter((t) => t.id == teamId).flatMap((t) => t.monsters);

  if (myMonsters == undefined) {
    return (
      <Paper style={{ height: '100%' }} sx={{ backgroundColor: red[100] }}>
        Test
      </Paper>
    );
  }

  const list = myMonsters.map((m) => (
    <Grid item key={m}>
      <MonsterView monId={m} teamId={teamId} battleId={battleId} key={m}></MonsterView>
    </Grid>
  ));

  return (
    <Paper sx={{ backgroundColor: blue[50] }}>
      <h2>Team {teamId}</h2>
      <Grid container>{list}</Grid>
    </Paper>
  );
}

export default BattleTeam;
