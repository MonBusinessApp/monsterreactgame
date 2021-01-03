import { Container } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../Store/store';
import ActiveBattleView from './BattleView/ActiveBattleView';
import BattleListView from './BattleView/BattleListView';

function BattleView(): React.ReactElement {
  const battleState = useSelector((state: RootState) => state.battle);

  if (battleState.activeBattleUI == null) {
    return <BattleListView />;
  }
  return (
    <Container>
      <ActiveBattleView></ActiveBattleView>
    </Container>
  );
}

export default BattleView;
