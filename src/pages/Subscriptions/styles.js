import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 20px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-bottom: 50px;
`;

export const NoMeetups = styled.Text`
  color: #999;
  font-size: 16px;
  align-self: center;
  margin: 20px 0;
`;
