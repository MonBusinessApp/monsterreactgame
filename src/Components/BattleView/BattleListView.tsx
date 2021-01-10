import React, { useState } from 'react';
import { RootState } from '../../Store/store';
import { useSelector } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary, Fab, makeStyles } from '@material-ui/core';
import { sendStartBattleCmd } from '../../Services/battle';

function QuestListView(): React.ReactElement {
  const battleState = useSelector((state: RootState) => state.battle);

  const [selectedBattle, setSelectedBattle] = useState<number | undefined>();

  function handleClickstartBattle() {
    if (selectedBattle == undefined) {
      throw 'battle is not selected';
    }
    sendStartBattleCmd(selectedBattle);
  }

  const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: 'auto',
    },
  }));

  const classes = useStyles();

  function renderStartButton() {
    if (selectedBattle == undefined) {
      return <div></div>;
    }

    return (
      <Fab
        color="primary"
        onClick={handleClickstartBattle}
        className={classes.fab}
        aria-label="start"
        variant="extended"
      >
        Start
      </Fab>
    );
  }

  const battles = battleState.battles;
  return (
    <div>
      {renderStartButton()}
      {battles.map((b) => (
        <Accordion expanded={b.id === selectedBattle} onChange={() => setSelectedBattle(b.id)} key={b.id}>
          <AccordionSummary>{b.id}</AccordionSummary>
          <AccordionDetails>Super detailed stuff</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default QuestListView;
