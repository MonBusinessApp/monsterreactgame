import React from 'react';
import { RootState } from '../../Store/store';
import { useSelector } from 'react-redux';
import { Grid, List, makeStyles, Paper } from '@material-ui/core';
import MonsterView from './MonsterView';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { battleSelectors } from '../../Store/battleStore';
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


  let myMonsters = battle?.teams.filter(t => t.id == teamId).flatMap(t => t.monsters)
  if (myMonsters == undefined) {
    return (
      <Paper style={{ height: '100%' }} className={classes.paperError}>
        Test
      </Paper>
    );
  }

  const list = myMonsters.map(m => <MonsterView monId={m} teamId={teamId}></MonsterView>);

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
