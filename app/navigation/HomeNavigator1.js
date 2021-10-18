/**
 * safetrack - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// import components
import TabBadgeIcon from '../components/navigation/TabBadgeIcon';

// import Home screen
import Home from '../screens/home/Home1';

// import Search screen
import Search from '../screens/search/Search';

import Map from '../screens/Map/Map';

// import Cart screen
import Camera from '../screens/Camera/Camera';

import Settings from '../screens/settings/Settings';

// import colors
import Colors from '../theme/colors';
import {color} from 'react-native-reanimated';
import {Platform, StyleSheet} from 'react-native';

// HomeNavigator Config

type Props = {
  color: string,
  focused: string,
  size: number,
};

// create bottom tab navigator
const Tab = createBottomTabNavigator();

// HomeNavigator
function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused, size}: Props) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'magnify';
          } else if (route.name === 'Map') {
            iconName = `map${focused ? '' : '-outline'}`;
          } else if (route.name === 'Settings') {
            iconName = `account-settings${focused ? '' : '-outline'}`;
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.secondaryText,
        showLabel: false, // hide labels
        style: {
          backgroundColor: Colors.surface, // TabBar background
        },
      }}>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarIcon: (props) => (
            <TabBadgeIcon
              name={`camera${props.focused ? '' : '-outline'}`}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: (props) => (
            <TabBadgeIcon
              name={`home${props.focused ? '' : '-outline'}`}
              //badgeCount={5}
              {...props}
              size={35}
              color={Colors.onPrimaryColor}
              style={Platform.OS == 'ios' ? styles.iosMenu : styles.androidMenu}
            />
          ),
        }}
      />

      <Tab.Screen name="Map" component={Map} />

      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  androidMenu: {
    marginBottom: 20,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 100,
  },
  iosMenu: {
    bottom: 5,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 100,
    position: 'absolute',
  },
});

export default HomeNavigator;
