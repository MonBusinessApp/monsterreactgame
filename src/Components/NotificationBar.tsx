import { Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import store, { RootState } from '../Store/store';

import MuiAlert from '@mui/material/Alert';
import { notificationConfig, remove } from '../Store/notificationStore';

function NotificationBar(): React.ReactElement {
  const notificationState = useSelector((state: RootState) => state.notification);

  const [hideTimeout, setHideTimeout] = useState(null as NodeJS.Timeout | null);

  const isOpen = notificationState.messages.length >= 1;
  const handleClose = (id: string) => {
    if (hideTimeout != null) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }

    store.dispatch(remove(id));
  };

  useEffect(() => {
    if (notificationState.messages.length >= 1) {
      const id = notificationState.messages[0].id;
      if (hideTimeout == null) {
        const t = setTimeout(() => {
          console.log('this happens');
          setHideTimeout(null);
          handleClose(id);
        }, notificationConfig.durationinMs);
        setHideTimeout(t);
      }
    }
  }, [notificationState.messages]);

  if (isOpen) {
    return (
      <Snackbar open={isOpen}>
        <MuiAlert onClose={() => handleClose(notificationState.messages[0].id)} severity="success">
          {notificationState.messages[0].text}
        </MuiAlert>
      </Snackbar>
    );
  } else {
    return <div></div>;
  }
}

export default NotificationBar;
