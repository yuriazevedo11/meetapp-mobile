/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput, Error } from './styles';

function Input({ style, icon, error, ...rest }, ref) {
  return (
    <>
      <Container style={style}>
        {icon && (
          <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />
        )}
        <TInput {...rest} ref={ref} />
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  error: PropTypes.string,
};

Input.defaultProps = {
  style: {},
  icon: null,
  error: '',
};

export default forwardRef(Input);
