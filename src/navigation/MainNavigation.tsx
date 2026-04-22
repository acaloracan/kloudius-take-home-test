import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { Home } from '../screens/Home';
import Loading from '../screens/Loading';
import { Login } from '../screens/Login';
import { SignUp } from '../screens/SignUp';
import { RouteNames } from './routes';

export type MainStackParamList = {
  [RouteNames.Home]: undefined;
  [RouteNames.Login]: undefined;
  [RouteNames.SignUp]: undefined;
  [RouteNames.Loading]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export type MainStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  keyof MainStackParamList
>;

export type MainStackRouteProp<RouteName extends keyof MainStackParamList> =
  RouteProp<MainStackParamList, RouteName>;

export const MainStackNavigator = () => {
  const { isLogin, loading } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loading ? (
        <Stack.Screen name={RouteNames.Login} component={Loading} />
      ) : isLogin ? (
        <Stack.Screen name={RouteNames.Home} component={Home} />
      ) : (
        <>
          <Stack.Screen name={RouteNames.Login} component={Login} />
          <Stack.Screen name={RouteNames.SignUp} component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};
