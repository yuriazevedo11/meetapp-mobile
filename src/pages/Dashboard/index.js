import React, { useState, useMemo, useEffect } from 'react';
import {
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import MeetupCard from '~/components/MeetupCard';

import {
  Container,
  Header,
  Title,
  MeetupsList,
  LoadingContainer,
  NoMeetups,
} from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: ptBR }),
    [date]
  );

  async function loadMeetups(curentPage = 1) {
    const response = await api.get('/meetups', {
      params: { date, page: curentPage },
    });

    if (curentPage >= 2) {
      setMeetups(prevMeetups => [...prevMeetups, ...response.data]);
    } else {
      setMeetups(response.data);
    }

    setLoading(false);
    setRefreshing(false);
    setPage(curentPage);
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [date, isFocused]); // eslint-disable-line

  function handlePrevDay() {
    setLoading(true);
    setDate(subDays(date, 1));
  }

  function handleNaxtDay() {
    setLoading(true);
    setDate(addDays(date, 1));
  }

  function loadMoreMeetups() {
    const nextPage = page + 1;
    loadMeetups(nextPage);
  }

  function refreshMeetups() {
    setRefreshing(true);
    loadMeetups();
  }

  async function subscribe(id) {
    try {
      await api.post(`subscriptions/${id}`);

      setMeetups(
        meetups.map(meetup =>
          meetup.id === id ? { ...meetup, disabled: true } : meetup
        )
      );
    } catch (error) {
      Alert.alert('Falha na inscrição', 'Tente novamente');
    }
  }

  const refreshConfig = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={refreshMeetups}
      colors={['#f94d6a']}
      tintColor="#f94d6a"
    />
  );

  return (
    <Background>
      <Container>
        <Header>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={36} color="#fff" />
          </TouchableOpacity>
          <Title>{dateFormatted}</Title>
          <TouchableOpacity onPress={handleNaxtDay}>
            <Icon name="chevron-right" size={36} color="#fff" />
          </TouchableOpacity>
        </Header>

        {loading ? (
          <LoadingContainer>
            <ActivityIndicator
              style={{ transform: [{ scale: 2 }] }}
              color="#f94d6a"
              size="large"
            />
          </LoadingContainer>
        ) : (
          <MeetupsList
            data={meetups}
            keyExtractor={meetup => String(meetup.id)}
            onEndReachedThreshold={0.75}
            onEndReached={loadMoreMeetups}
            refreshControl={refreshConfig}
            renderItem={({ item }) => (
              <MeetupCard
                data={item}
                action={() => subscribe(item.id)}
                actionTitle="Realizar Inscrição"
              />
            )}
            ListEmptyComponent={
              <NoMeetups>Não tem nenhum meetup neste dia</NoMeetups>
            }
          />
        )}
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

export default withNavigationFocus(Dashboard);

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

navIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
