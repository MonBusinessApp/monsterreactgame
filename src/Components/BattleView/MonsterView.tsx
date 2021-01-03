import React, { useState } from 'react';
import store, { RootState } from '../../Store/store';
import { useSelector } from 'react-redux';
import {
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  SvgIcon,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Monster } from '../../Models/monster';
import { green, grey, red, teal } from '@material-ui/core/colors';
import { BattlePos, isBattlePosEqual } from '../../Models/battle';
import { setTargetPos } from '../../Store/battleStore';
import { mdiSkullCrossbones } from '@mdi/js';
import { ReactComponent } from '*.svg';

function MonsterView({
  monId,
  monPos,
  possibleTarget = false,
}: {
  monId: number;
  monPos: BattlePos;
  possibleTarget?: boolean;
}): React.ReactElement {
  const monsterState: Monster | undefined = useSelector((state: RootState) =>
    state.monster.monsters.find((t) => t.id === monId),
  );

  const activeBattleUI = useSelector((state: RootState) => state.battle.activeBattleUI);
  if (activeBattleUI == null) {
    throw 'activeBattle is null';
  }

  const [isMouseOver, handleMouseOver] = useState(false);
  if (monsterState == undefined) {
    return (
      <Paper color="red" variant="outlined">
        Test
      </Paper>
    );
  }

  function handleClick() {
    store.dispatch(setTargetPos(monPos));
  }

  let saturation: '100' | '300' = '100';
  if (isMouseOver) {
    saturation = '300';
  }

  let backgroundColor: string = grey[saturation];
  if (possibleTarget) {
    backgroundColor = red[saturation];
  }
  if (activeBattleUI.nextMonsterId == monId) {
    backgroundColor = green[saturation];
  }
  //todo make a hook out of them
  let isAlive = true;
  if (monsterState.battleValues.currentHP <= 0) {
    isAlive = false;
    backgroundColor = grey[400];
  }

  function getStyles(): { variant: 'outlined' | 'elevation'; classNames: string[] } {
    let variant: 'outlined' | 'elevation';
    const classNames = [classes.monsterRoot];
    if (isBattlePosEqual(activeBattleUI?.targetPos, monPos)) {
      variant = 'outlined';
      classNames.push(classes.paperOutline);
    } else {
      variant = 'elevation';
    }
    return { variant, classNames };
  }

  const useStyles = makeStyles((theme) => ({
    monsterRoot: {
      backgroundColor,
      padding: theme.spacing(1),
    },
    progressRoot: {
      height: 10,
    },
    paperOutline: {
      borderWidth: 3,
      borderColor: teal[300],
    },
  }));
  const classes = useStyles();

  const styles = getStyles();

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
            className={classes.progressRoot}
            variant="determinate"
            color="secondary"
            value={(m.battleValues.currentHP / m.battleValues.maxHP) * 100}
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

  const monsterView = (
    <Paper
      variant={styles.variant}
      className={styles.classNames.reduce((allClasses, currClass) => `${allClasses} ${currClass}`)}
      {...viewProps}
    >
      <List dense={true}>
        <ListItem>
          <ListItemIcon>Name</ListItemIcon>
          <ListItemText>{monsterState.name}</ListItemText>
        </ListItem>
        {renderHealth(monsterState, isAlive)}
      </List>
    </Paper>
  );

  return monsterView;
}

export default MonsterView;
