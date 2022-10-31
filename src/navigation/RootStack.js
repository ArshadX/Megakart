import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductList from '../container/ProductList';
import ProductDetails from '../container/ProductDetails';
const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerStyle: {backgroundColor: '#6495ED'},
        statusBarColor: '#4169E1',
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Details" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default RootStack;
