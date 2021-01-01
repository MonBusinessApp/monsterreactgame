import React from 'react';
import { RootState } from '../Store/store';
import { useSelector } from 'react-redux';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import MonsterView from './MonsterView';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
function BattleTeam({ teamId, battleId }: { teamId: number; battleId: number }): React.ReactElement {
  const battle = useSelector((state: RootState) => state.battle.battles.find((b) => b.id == battleId));
  const myLineUp = battle?.lineUps.find((l) => l.teamId == teamId);
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

  if (myLineUp == undefined) {
    return (
      <Paper style={{ height: '100%' }} className={classes.paperError}>
        Test
      </Paper>
    );
  }

  const lineUp = myLineUp.lineUp;
  const list = [];
  for (let x = 0; x < lineUp.length; x++) {
    for (let y = 0; y < lineUp[x].length; y++) {
      const mId = lineUp[x][y];
      list.push(
        <Grid item key={mId} xs={6}>
          <MonsterView monId={mId} monPos={{ pos: [x, y], teamId: myLineUp.teamId }}></MonsterView>
        </Grid>,
      );
    }
  }

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
