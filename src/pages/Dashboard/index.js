import React, { useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import { Container, Header, Title } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: ptBR }),
    [date]
  );

  return (
    <Background>
      <Container>
        <Header>
          <TouchableOpacity onPress={() => setDate(subDays(date, 1))}>
            <Icon name="chevron-left" size={36} color="#fff" />
          </TouchableOpacity>
          <Title>{dateFormatted}</Title>
          <TouchableOpacity onPress={() => setDate(addDays(date, 1))}>
            <Icon name="chevron-right" size={36} color="#fff" />
          </TouchableOpacity>
        </Header>
      </Container>
    </Background>
  );
}

function navIcon({ tintColor }) {
  return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: navIcon,
};

navIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
