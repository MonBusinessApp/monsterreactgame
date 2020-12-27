import React from 'react';
import { RootState } from '../Store/store';
import { useSelector } from 'react-redux';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Monster from './Monster';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
function BattleTeam({ teamId }: { teamId: number }): React.ReactElement {
  const teamState = useSelector((state: RootState) => state.team.teams.find((t) => t.id === teamId));
  console.log(teamState);
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

  if (teamState == undefined) {
    return (
      <Paper style={{ height: '100%' }} className={classes.paperError}>
        Test
      </Paper>
    );
  }

  return (
    <Paper className={classes.paperRoot}>
      <Grid container spacing={3}>
        {teamState.monsterLineUp.flat().map((mId: number) => (
          <Grid item key={mId} xs={6}>
            <Monster monId={mId}></Monster>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default BattleTeam;
