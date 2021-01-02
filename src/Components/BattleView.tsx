import React from 'react';
import { useSelector } from 'react-redux';
import { Container, List, ListItem } from '@material-ui/core';
import { RootState } from '../Store/store';

function BattleListView(): React.ReactElement {
  const battleState = useSelector((state: RootState) => state.battle);

  const battles = battleState.battles;

  if (battleState.activeBattleUI == null) {
    return BattleListView();
  }
  return (
    <Container>
      <List component="nav" aria-label="secondary mailbox folders">
        {battles.map((b) => (
          <ListItem key={b.id}></ListItem>
        ))}
      </List>
    </Container>
  );
}

export default BattleListView;
