import React from 'react';

import { useSelector } from 'react-redux';
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SvgIcon,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { grey } from '@mui/material/colors';

import { mdiShield, mdiSkullCrossbones } from '@mdi/js';
import { RootState } from '../Store/store';
import { monsterSelectors } from '../Store/monsterStore';
import { Monster } from '../Models/monster';
import { mdiSwordCross } from '@mdi/js';

type MonStatus = 'Dead' | 'Standard';

function LinearProgressWithLabel(props: LinearProgressProps & { currentval: number; maxval: number }) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} value={(props.currentval / props.maxval) * 100} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${props.currentval}/${props.maxval}`}</Typography>
      </Box>
    </Box>
  );
}

function CalcMonStatus(monster: Monster): MonStatus {
  if (monster.battleValues.remainingHp <= 0) {
    return 'Dead';
  } else {
    return 'Standard';
  }
}

function MonsterDetailsView({ monId }: { monId: number }): React.ReactElement {
  const monsterState: Monster | undefined = useSelector((state: RootState) =>
    monsterSelectors.selectById(state, monId),
  );

  if (monsterState == undefined) {
    return <div></div>;
  }
  const monStatus = CalcMonStatus(monsterState);

  function renderHealth(m: Monster, monState: MonStatus) {
    let icon: React.ReactElement;
    if (monState == 'Dead') {
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
          <LinearProgressWithLabel
            sx={{ height: 10 }}
            variant="determinate"
            color="secondary"
            currentval={m.battleValues.remainingHp}
            maxval={m.battleValues.maxHp}
          />
        </ListItemText>
      </ListItem>
    );
  }

  const monsterView = (
    <Paper sx={{ backgroundColor: grey[100] }}>
      <List dense={true}>
        <ListItem>
          <ListItemIcon>Name</ListItemIcon>
          <ListItemText>{monsterState.name}</ListItemText>
        </ListItem>
        {renderHealth(monsterState, monStatus)}
        <ListItem>
          <ListItemIcon>
            <SvgIcon>
              <path d={mdiSwordCross}></path>
            </SvgIcon>
          </ListItemIcon>
          <ListItemText>{monsterState.battleValues.attack}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SvgIcon>
              <path d={mdiShield}></path>
            </SvgIcon>
          </ListItemIcon>
          <ListItemText>{monsterState.battleValues.defense}</ListItemText>
        </ListItem>
      </List>
    </Paper>
  );
  return monsterView;
}

export default MonsterDetailsView;
