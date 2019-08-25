import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 20px;
  opacity: ${props => (props.past ? 0.8 : 1)};
`;

export const ImgWrapper = styled.View`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  height: 140px;
`;

export const Image = styled.Image`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  flex: 1;
`;

export const Info = styled.View`
  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 15px 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Details = styled.View`
  padding: 0 20px;
  margin: 10px 0 20px;
`;

export const Time = styled.Text`
  color: #999;
  margin-bottom: 5px;
  line-height: 24px;
`;

export const Location = styled.Text`
  color: #999;
  margin-bottom: 5px;
  line-height: 24px;
`;

export const Author = styled.Text`
  color: #999;
  line-height: 24px;
`;

export const ActionButton = styled(Button)``;
