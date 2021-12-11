import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import BattleView from './Components/BattleView';
import AppBar from './Components/AppBar';
import NotificationBar from './Components/NotificationBar';
import store, { RootState } from './Store/store';

import { createAddNotification } from './Store/notificationStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, Theme, StyledEngineProvider, createTheme } from '@mui/material/styles';

import MonsterListView from './Components/MonsterListView';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function App(): React.ReactElement {
  function handleClick() {
    store.dispatch(createAddNotification('hallo bob'));
  }

  const theme = createTheme();

  const authState = useSelector((state: RootState) => state.auth);
  if (authState.type == 'loggedOut') {
    return <div>Not logged in!! TODO</div>;
  }
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="App">
          <NotificationBar />

          <BrowserRouter>
            <AppBar></AppBar>
            <Routes>
              <Route path="/battle" element={<BattleView />} />
              <Route path="/monster" element={<MonsterListView userId={authState.userId} />} />
            </Routes>
          </BrowserRouter>
          <Button onClick={handleClick}>Click</Button>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
