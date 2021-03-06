/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import TabBadgeIcon from '../components/navigation/TabBadgeIcon';

import Home from '../screens/home/Home2';

import Search from '../screens/search/Search';

import Map from '../screens/Map/Map';

import Camera from '../screens/Camera/Camera';

import Settings from '../screens/settings/Settings';

import Colors from '../theme/colors';
import {color} from 'react-native-reanimated';

type Props = {
  color: string,
  focused: string,
  size: number,
};

const Tab = createBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused, size}: Props) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'magnify';
          } else if (route.name === 'Map') {
            iconName = `heart${focused ? '' : '-outline'}`;
          } else if (route.name === 'Settings') {
            iconName = `account-settings${focused ? '' : '-outline'}`;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.secondaryText,
        showLabel: false,
        style: {
          backgroundColor: Colors.surface,
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarIcon: (props) => (
            <TabBadgeIcon
              name={`camera${props.focused ? '' : '-outline'}`}
              badgeCount={5}
              {...props}
            />
          ),
        }}
      />

      <Tab.Screen name="Map" component={Map} />

      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default HomeNavigator;
