import React, { useEffect, useState } from 'react';
import store, { RootState } from '../../Store/store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { LinearProgress, List, ListItem, ListItemIcon, ListItemText, Paper, SvgIcon, SxProps } from '@mui/material';
import { Monster } from '../../Models/monster';
import { green, grey, red } from '@mui/material/colors';
import { mdiSkullCrossbones } from '@mdi/js';
import { monsterSelectors } from '../../Store/monsterStore';
import { battleSelectors } from '../../Store/battleStore';
import { setTarget } from '../../Services/battleService';
import { getMonsterById } from '../../Services/monsterService';

function MonsterView({
  monId,
  teamId,
  battleId,
  possibleTarget = false,
}: {
  monId: number;
  teamId: number;
  battleId: number;
  possibleTarget?: boolean;
}): React.ReactElement {
  const monsterState: Monster | undefined = useSelector((state: RootState) =>
    monsterSelectors.selectById(state, monId),
  );

  const selectedSource = useSelector(
    (state: RootState) => battleSelectors.selectById(state, battleId)?.activeBattle.turnQueue[0],
  );

  const activeBattleUI = useSelector((state: RootState) => state.activeBattle);
  if (activeBattleUI == null) {
    throw 'activeBattle is null';
  }

  const [isMouseOver, handleMouseOver] = useState(false);

  const isSelected = activeBattleUI.selectedTarget == monId;

  useEffect(() => {
    const fetchMonster = async () => {
      return await getMonsterById(monId);
    };

    fetchMonster();
  }, []);

  //todo refactoring
  let backgroundColor: string;

  function handleClick() {
    setTarget(monId);
  }

  let saturation: '100' | '300' = '100';
  if (isMouseOver) {
    saturation = '300';
    backgroundColor = grey[saturation];
  }

  if (possibleTarget) {
    backgroundColor = red[saturation];
  }

  if (selectedSource == monId) {
    backgroundColor = green[saturation];
  }

  let isAlive = true;
  if (monsterState != undefined && monsterState.battleValues.remainingHp <= 0) {
    isAlive = false;
    backgroundColor = grey[400];
  }

  function renderHealth(m: Monster, isAlive: boolean) {
    let icon: React.ReactElement;
    if (isAlive == false) {
      icon = (
        <SvgIcon>
          <path d={mdiSkullCrossbones}></path>
        </SvgIcon>
      );
    } else {
      icon = <FavoriteIcon />;
    }
    return (
      <ListItem aria-label="healthpoints">
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <LinearProgress
            sx={{ height: 10, width: 100 }}
            variant="determinate"
            color="secondary"
            value={(m.battleValues.remainingHp / m.battleValues.maxHp) * 100}
          />
        </ListItemText>
      </ListItem>
    );
  }

  let viewProps = {};
  if (isAlive) {
    viewProps = {
      onClick: handleClick,
      onMouseOver: () => handleMouseOver(true),
      onMouseLeave: () => handleMouseOver(false),
    };
  }

  const monsterView = (monsterState: Monster) => {
    const renderInner = () => {
      return (
        <List dense={true}>
          <ListItem>
            <ListItemIcon>Name</ListItemIcon>
            <ListItemText>{monsterState.name}</ListItemText>
          </ListItem>
          {renderHealth(monsterState, isAlive)}
        </List>
      );
    };

    let sx: SxProps = { backgroundColor: backgroundColor, margin: 1 };
    if (isSelected) {
      sx = { ...sx, borderWidth: 3, borderColor: red[300] };
    }
    return (
      <Paper variant={isSelected ? 'outlined' : 'elevation'} sx={sx} {...viewProps}>
        {renderInner()}
      </Paper>
    );
  };

  if (monsterState == undefined) {
    return (
      <Paper color="red" variant="outlined">
        Test
      </Paper>
    );
  }

  return monsterView(monsterState);
}

export default MonsterView;
