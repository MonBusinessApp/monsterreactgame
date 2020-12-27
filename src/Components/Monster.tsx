import React, { useState } from 'react';
import { RootState } from '../Store/store';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Monster } from '../Models/monster';
import { blue } from '@material-ui/core/colors';

function BattleTeam({ monId }: { monId: number }): React.ReactElement {
  const monsterState: Monster | undefined = useSelector((state: RootState) =>
    state.monster.monsters.find((t) => t.id === monId),
  );

  const [isMouseOver, setMouseOver] = useState(false);

  if (monsterState == undefined) {
    return (
      <Paper color="red" variant="outlined">
        Test
      </Paper>
    );
  }
  const useStyles = makeStyles((theme) => ({
    monsterRoot: {
      backgroundColor: isMouseOver ? blue[300] : blue[100],
      padding: theme.spacing(1),
    },
    progressRoot: {
      height: 10,
    },
  }));
  const classes = useStyles();

  return (
    <Paper
      className={classes.monsterRoot}
      onMouseOver={(e) => setMouseOver(true)}
      onMouseLeave={(e) => setMouseOver(false)}
    >
      <List dense={true}>
        <ListItem>
          <ListItemIcon>Name</ListItemIcon>
          <ListItemText>{monsterState.name}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText>
            <LinearProgress
              className={classes.progressRoot}
              variant="determinate"
              color="secondary"
              value={(monsterState.battleValues.currentHP / monsterState.battleValues.maxHP) * 100}
            />
          </ListItemText>
        </ListItem>
      </List>
    </Paper>
  );
}

export default BattleTeam;
