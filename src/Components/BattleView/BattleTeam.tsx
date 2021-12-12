import React from 'react';
import { RootState } from '../../Store/store';
import { useSelector } from 'react-redux';
import { Grid, List, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import MonsterView from './MonsterView';
import { battleSelectors } from '../../Store/battleStore';
import { blue, red } from '@mui/material/colors';
function BattleTeam({ teamId, battleId }: { teamId: number; battleId: number }): React.ReactElement {
  const battle = useSelector((state: RootState) => battleSelectors.selectById(state, battleId));
  const useStyles = makeStyles((theme) => ({
    paperRoot: {
      backgroundColor: blue[100],
      padding: theme.spacing(2),
    },
    paperError: {
      backgroundColor: red[100],
    },
  }));
  const classes = useStyles();

  const myMonsters = battle?.teams.filter((t) => t.id == teamId).flatMap((t) => t.monsters);
  console.log(
    'teamstuff',
    battle?.teams.filter((t) => t.id == teamId),
  );
  if (myMonsters == undefined) {
    return (
      <Paper style={{ height: '100%' }} className={classes.paperError}>
        Test
      </Paper>
    );
  }

  const list = myMonsters.map((m) => <MonsterView monId={m} teamId={teamId} battleId={battleId} key={m}></MonsterView>);

  return (
    <Paper className={classes.paperRoot}>
      <h2>Team {teamId}</h2>
      <Grid container spacing={2}>
        {list}
      </Grid>
    </Paper>
  );
}

export default BattleTeam;
