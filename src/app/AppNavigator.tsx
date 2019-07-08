import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Button } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CharacterContainer from './modules/character/CharacterContainer';
import MapContainer from './modules/map/MapContainer';

const AppNavigator = createMaterialBottomTabNavigator({
  World: {
    screen: MapContainer,
    navigationOptions: {
      tabBarIcon: () => (
        <Ionicons name="md-map" size={30} color="white" />
      )
    }
  },
  Character: {
    screen: CharacterContainer,
    navigationOptions: {
      tabBarIcon: () => (
        <Ionicons name="md-man" size={30} color="white" />
      )
    }
  },
}, {
  initialRouteName: 'World',
}
)

export default AppNavigator;
