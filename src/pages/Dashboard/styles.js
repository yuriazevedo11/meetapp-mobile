import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  margin: 30px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  margin: 0 10px;
`;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px 20px;
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
`;
