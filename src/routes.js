import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Image } from 'react-native';

import logo from './assets/logo.png';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createStackNavigator(
          {
            Routes: createBottomTabNavigator(
              {
                Dashboard,
                Subscriptions,
                Profile,
              },
              {
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#fff',
                  inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                  style: {
                    borderTopWidth: 0,
                    backgroundColor: '#2b1a2f',
                    paddingVertical: 5,
                    height: 55,
                  },
                },
              }
            ),
          },
          {
            headerLayoutPreset: 'center',
            defaultNavigationOptions: {
              headerTintColor: '#000',
              headerStyle: {
                backgroundColor: '#18161f',
              },
              headerTitle: (
                <Image style={{ height: 30, width: 30 }} source={logo} />
              ),
              headerBackTitle: null,
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
