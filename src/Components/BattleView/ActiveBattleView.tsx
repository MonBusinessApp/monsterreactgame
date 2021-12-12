import React, { useEffect, useState } from 'react';
import { RootState } from '../../Store/store';
import { useSelector } from 'react-redux';
import { Fab, Grid, SvgIcon } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import BattleTeam from './BattleTeam';
import { mdiSwordCross } from '@mdi/js';
import { battleSelectors } from '../../Store/battleStore';
import { executeAction, getBattleById, setActiveBattle } from '../../Services/battleService';
import { useParams } from 'react-router-dom';

function handleClickAttack(battleId: number, source: number, target: number | undefined) {
  if (target == undefined) {
    return;
  }
  executeAction({ battleId, source, target });
}

function ActiveBattleView(): React.ReactElement {
  const { id } = useParams();
  if (id == undefined) {
    return <div>An error occured. Path param is not set!</div>;
  }
  const battleId = parseInt(id);
  const battle = useSelector((state: RootState) => battleSelectors.selectById(state, battleId));
  const activeBattleUi = useSelector((state: RootState) => state.activeBattle);

  useEffect(() => {
    const fetchBattle = async () => {
      return await getBattleById(battleId);
    };

    fetchBattle();
    setActiveBattle(battleId);
  }, []);

  const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: 'auto',
    },
  }));

  const classes = useStyles();

  if (battle == undefined || battle.activeBattle == undefined) {
    return <div>Battle not active</div>;
  }

  const selectedSource = battle.activeBattle.turnQueue[0];
  function renderAttackButton() {
    if (activeBattleUi.selectedTarget == undefined) {
      return <div></div>;
    }

    return (
      <Fab
        color="secondary"
        onClick={() => handleClickAttack(battleId, selectedSource, activeBattleUi.selectedTarget)}
        className={classes.fab}
        aria-label="attack"
      >
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
        {battle.teams.map((t) => (
          <Grid item key={t.id} xs={6}>
            <BattleTeam teamId={t.id} battleId={battle.id} key={t.id}></BattleTeam>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ActiveBattleView;
