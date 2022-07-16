import React, { useEffect, useState } from 'react';
import { RootState } from '../../Store/store';
import { useSelector } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary, Button, Fab } from '@mui/material';
import { battleSelectors } from '../../Store/battleStore';
import { getBattlesByUser, startBattle } from '../../Services/battleService';
import { Battle } from '../../Models/battle';
import { Link } from 'react-router-dom';

function QuestListView(): React.ReactElement {
  const battles = useSelector((state: RootState) => battleSelectors.selectAll(state));

  const [selectedBattle, setSelectedBattle] = useState<number | undefined>();

  function handleClickstartBattle() {
    if (selectedBattle == undefined) {
      throw 'battle is not selected';
    }
    startBattle(selectedBattle);
  }

  useEffect(() => {
    const fetchBattles = async () => {
      return await getBattlesByUser(1);
    };

    fetchBattles();
  }, []);

  function renderStartButton() {
    if (selectedBattle == undefined) {
      return <div></div>;
    }

    return (
      <Fab
        color="primary"
        onClick={handleClickstartBattle}
        sx={{ position: 'fixed', bottom: '1rem', right: 'auto' }}
        aria-label="start"
        variant="extended"
      >
        Start
      </Fab>
    );
  }

  function renderGotoButton(battle: Battle) {
    if (battle.status == 'active') {
      return (
        <Button to={`/battle/${battle.id}`} component={Link}>
          Goto
        </Button>
      );
    }
    return <div></div>;
  }

  return (
    <div>
      {renderStartButton()}
      {battles.map((b) => (
        <Accordion expanded={b.id === selectedBattle} onChange={() => setSelectedBattle(b.id)} key={b.id}>
          <AccordionSummary>{b.id}</AccordionSummary>
          <AccordionDetails>Super detailed stuff</AccordionDetails>
          {renderGotoButton(b)}
        </Accordion>
      ))}
    </div>
  );
}

export default QuestListView;
