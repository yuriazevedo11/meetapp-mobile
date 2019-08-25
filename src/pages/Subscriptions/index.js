import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import { Container } from './styles';

export default function Subscriptions() {
  return (
    <Background>
      <Container />
    </Background>
  );
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
