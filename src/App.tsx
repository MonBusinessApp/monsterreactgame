import React, { useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import BattleView from './Components/BattleView';
import AppBar from './Components/AppBar';
import NotificationBar from './Components/NotificationBar';
import store, { RootState } from './Store/store';

import { createAddNotification } from './Store/notificationStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider, Theme, StyledEngineProvider, createTheme } from '@mui/material/styles';

import MonsterListView from './Components/MonsterListView';
import ActiveBattleView from './Components/BattleView/ActiveBattleView';
import { amber } from '@mui/material/colors';
import { wsConnect } from './Services/eventService';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function App(): React.ReactElement {
  function handleClick() {
    store.dispatch(createAddNotification('hallo bob'));
  }

  const theme = createTheme({ palette: { secondary: { main: amber[200] } } });

  useEffect(() => {
    wsConnect();
  }, []);

  //const authState = useSelector((state: RootState) => state.auth);
  //if (authState.type == "loggedOut") {
  //  return <div>Not logged in!! TODO</div>;
  //}
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <div className="App">
            <NotificationBar />

            <BrowserRouter>
              <AppBar></AppBar>
              <Routes>
                <Route path="/battle" element={<BattleView />} />
                <Route path="/battle/:id" element={<ActiveBattleView />} />
                <Route path="/monster" element={<MonsterListView userId={1} />} />
              </Routes>
            </BrowserRouter>
            <Button onClick={handleClick}>Click</Button>
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
