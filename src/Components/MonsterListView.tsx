import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { monsterSelectors } from '../Store/monsterStore';

import { RootState } from '../Store/store';
import MonsterDetailsView from './MonsterDetailsView';

function MonsterListView({ userId }: { userId: number }): React.ReactElement {
  const monsterList = useSelector((state: RootState) =>
    monsterSelectors.selectAll(state).filter((m) => m.userId == userId),
  );

  return (
    <Container>
      <Grid container>
        {monsterList.map((m) => {
          return (
            <Grid item md={3} key={m.id}>
              <MonsterDetailsView monId={m.id}></MonsterDetailsView>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default MonsterListView;
