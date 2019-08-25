import React from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import {
  Container,
  ImgWrapper,
  Image,
  Info,
  Title,
  Details,
  Time,
  Location,
  Author,
  ActionButton,
} from './styles';

export default function MeetupCard({ data, action, actionTitle }) {
  const formattedDate = format(parseISO(data.date), "d 'de' MMMM', às' HH'h'", {
    locale: ptBR,
  });

  return (
    <Container past={data.past}>
      <ImgWrapper>
        {data.File && <Image source={{ uri: data.File.url }} />}
      </ImgWrapper>
      <Info>
        <Title>{data.title}</Title>
        <Details>
          <Time>{formattedDate}</Time>
          <Location>{data.location}</Location>
          <Author>Organizado por: {data.User.name}</Author>
        </Details>
        {!(data.past || data.disabled) && (
          <ActionButton onPress={action}>{actionTitle}</ActionButton>
        )}
      </Info>
    </Container>
  );
}

MeetupCard.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    past: PropTypes.bool,
    disabled: PropTypes.bool,
    File: PropTypes.shape({
      url: PropTypes.string,
    }),
    User: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  action: PropTypes.func.isRequired,
  actionTitle: PropTypes.string.isRequired,
};
