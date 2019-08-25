import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import createRouter from './routes';
import NavigationService from './services/navigation';

export default function App() {
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={signed ? '#18161f' : '#25212e'}
      />
      <Routes
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </>
  );
}
