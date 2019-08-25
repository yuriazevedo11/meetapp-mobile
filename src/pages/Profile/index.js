import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function Profile() {
  return <Text>Profile</Text>;
}

function navIcon({ tintColor }) {
  return <Icon name="person" size={20} color={tintColor} />;
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: navIcon,
};

navIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
