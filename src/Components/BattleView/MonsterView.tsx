/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import store, { RootState } from '../../Store/store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import {
  css,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SvgIcon,
  SxProps,
} from '@mui/material';
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

  const nextTurnSource = useSelector(
    (state: RootState) => battleSelectors.selectById(state, battleId)?.activeBattle.turnQueue[0],
  );

  const activeBattleUI = useSelector((state: RootState) => state.activeBattle);
  if (activeBattleUI == null) {
    throw 'activeBattle is null';
  }

  const [isMouseOver, handleMouseOver] = useState(false);

  const isSelected = activeBattleUI.selectedTarget == monId;
  const isNextTurnSource = nextTurnSource == monId;

  type MonStatus = 'Dead' | 'Turn' | 'Standard' | 'PossibleTarget';

  function CalcMonStatus(monster: Monster, isNextTurnSource: boolean, possibleTarget: boolean): MonStatus {
    if (monster.battleValues.remainingHp <= 0) {
      return 'Dead';
    }
    if (isNextTurnSource) {
      return 'Turn';
    }
    if (possibleTarget) {
      return 'PossibleTarget';
    }
    return 'Standard';
  }
  useEffect(() => {
    const fetchMonster = async () => {
      return await getMonsterById(monId);
    };

    fetchMonster();
  }, []);
  if (monsterState == undefined) {
    return <div>Loading</div>;
  }

  const monStatus = CalcMonStatus(monsterState, isNextTurnSource, possibleTarget);

  let backgroundColor: string;

  function handleClick() {
    setTarget(monId);
  }

  let saturation: '100' | '300' = '100';
  if (isMouseOver) {
    saturation = '300';
    backgroundColor = grey[saturation];
  }

  switch (monStatus) {
    case 'Dead': {
      backgroundColor = grey[400];
      break;
    }
    case 'Turn': {
      backgroundColor = green[saturation];
      break;
    }
    case 'PossibleTarget': {
      backgroundColor = red[saturation];
      break;
    }
    case 'Standard': {
      backgroundColor = grey[saturation];
      break;
    }
  }

  if (possibleTarget) {
    backgroundColor = red[saturation];
  }

  function renderHealth(m: Monster, monStatus: MonStatus) {
    let icon: React.ReactElement;
    if (monStatus == 'Dead') {
      icon = (
        <SvgIcon>
          <path d={mdiSkullCrossbones}></path>
        </SvgIcon>
      );
    } else {
      icon = <FavoriteIcon />;
    }
    const healthPercentage = (m.battleValues.remainingHp / m.battleValues.maxHp) * 100;
    const healthColor = (function healthColor() {
      console.log(healthPercentage);
      if (healthPercentage < 30) {
        return red[500];
      }
      return green[500];
    })();

    return (
      <ListItem aria-label="healthpoints">
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <LinearProgress
            sx={{ height: 10, width: 100 }}
            variant="determinate"
            value={healthPercentage}
            css={css`
              background-color: ${grey[400]};
              span {
                background-color: ${healthColor};
              }
            `}
          />
        </ListItemText>
      </ListItem>
    );
  }

  let viewProps = {};
  if (monStatus != 'Dead') {
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
          {renderHealth(monsterState, monStatus)}
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
