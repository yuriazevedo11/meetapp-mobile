import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function Subscriptions() {
  return <Text>Subscriptions</Text>;
}

function navIcon({ tintColor }) {
  return <Icon name="tag" size={20} color={tintColor} />;
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: navIcon,
};

navIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
