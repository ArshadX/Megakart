import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import RootStack from './src/navigation/RootStack';
import Realm from 'realm';
const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
export default App;
