import React from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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
    <Container>
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
        <ActionButton onPress={action}>{actionTitle}</ActionButton>
      </Info>
    </Container>
  );
}
