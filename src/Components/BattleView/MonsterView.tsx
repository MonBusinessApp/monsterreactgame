import React, { useEffect, useState } from 'react';
import store, { RootState } from '../../Store/store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { LinearProgress, List, ListItem, ListItemIcon, ListItemText, Paper, SvgIcon } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Monster } from '../../Models/monster';
import { green, grey, red, teal } from '@mui/material/colors';
import { BattlePos, isBattlePosEqual } from '../../Models/battle';
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
  if (monsterState == undefined) {
    return (
      <Paper color="red" variant="outlined">
        Test
      </Paper>
    );
  }

  useEffect(() => {
    const fetchMonster = async () => {
      return await getMonsterById(monId);
    };

    fetchMonster();
  }, []);

  function handleClick() {
    setTarget(monId);
  }

  let saturation: '100' | '300' = '100';
  if (isMouseOver) {
    saturation = '300';
  }

  let backgroundColor: string = grey[saturation];
  if (possibleTarget) {
    backgroundColor = red[saturation];
  }

  if (selectedSource == monId) {
    backgroundColor = green[saturation];
  }
  //todo make a hook out of them
  let isAlive = true;
  if (monsterState.battleValues.remainingHp <= 0) {
    isAlive = false;
    backgroundColor = grey[400];
  }

  function getStyles(): { variant: 'outlined' | 'elevation'; classNames: string[] } {
    let variant: 'outlined' | 'elevation' = 'outlined';
    const classNames = [classes.monsterRoot];

    if (activeBattleUI.selectedTarget == monId) {
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
      width: 100,
    },
    paperOutline: {
      borderWidth: 3,
      borderColor: red[300],
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
