import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { ActivityIndicator, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import MeetupCard from '~/components/MeetupCard';

import { Container, MeetupsList, LoadingContainer, NoMeetups } from './styles';

function Subscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadMeetups() {
    const response = await api.get('/subscriptions');

    const formattedResponse = response.data.map(subscription => ({
      subscription_id: subscription.id,
      ...subscription.Meetup,
    }));

    setLoading(false);
    setRefreshing(false);
    setMeetups(formattedResponse);
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  function refreshMeetups() {
    setRefreshing(true);
    loadMeetups();
  }

  const refreshConfig = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={refreshMeetups}
      colors={['#f94d6a']}
      tintColor="#f94d6a"
    />
  );

  async function unsubscribe(id) {
    try {
      await api.delete(`subscriptions/${id}`);

      setMeetups(
        meetups.map(meetup =>
          meetup.subscription_id === id ? { ...meetup, disabled: true } : meetup
        )
      );
    } catch (error) {
      Alert.alert('Falha ao cancelar inscrição', 'Tente novamente');
    }
  }

  return (
    <Background>
      <Container>
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
            refreshControl={refreshConfig}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <MeetupCard
                data={item}
                action={() => unsubscribe(item.subscription_id)}
                actionTitle="Cancelar Inscrição"
              />
            )}
            ListEmptyComponent={
              <NoMeetups>Você não possui nenhuma inscrição {':('}</NoMeetups>
            }
          />
        )}
      </Container>
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

export default withNavigationFocus(Subscriptions);

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

navIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
