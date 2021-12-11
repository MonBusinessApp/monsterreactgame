import React from 'react';
import { RootState } from '../../Store/store';
import { useSelector } from 'react-redux';
import { Fab, Grid, SvgIcon } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import BattleTeam from './BattleTeam';
import { mdiSwordCross } from '@mdi/js';
/*
function handleClickAttack() {
  sendAttackCmd();
}

function ActiveBattleView(): React.ReactElement {
  const battleState = useSelector((state: RootState) => state.battle);

  const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: 'auto',
    },
  }));

  const classes = useStyles();

  const firstBattle = battleState.battles[0];

  if (battleState.activeBattleUI == null) {
    return <div>No active Battle</div>;
  }

  function renderAttackButton() {
    if (battleState.activeBattleUI?.targetPos == undefined) {
      return <div></div>;
    }

    return (
      <Fab color="secondary" onClick={handleClickAttack} className={classes.fab} aria-label="attack">
        <SvgIcon>
          <path d={mdiSwordCross}></path>
        </SvgIcon>
      </Fab>
    );
  }

  return (
    <div className="ActiveBattle">
      {renderAttackButton()}
      <Grid container className="ActiveBattle" spacing={4}>
        {firstBattle.lineUps.map((l) => (
          <Grid item key={l.teamId} xs={6}>
            <BattleTeam teamId={l.teamId} battleId={firstBattle.id}></BattleTeam>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
*/

function ActiveBattleView(): React.ReactElement {
  return <div></div>
}

export default ActiveBattleView;
