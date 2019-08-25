import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signUpRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            value={name}
            icon="person-outline"
            autoCorrect={false}
            placeholder="Nome completo"
            onSubmitEditing={() => emailRef.current.focus()}
            blurOnSubmit={false}
            returnKeyType="next"
            onChangeText={setName}
          />

          <FormInput
            value={email}
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            onSubmitEditing={() => passwordRef.current.focus()}
            blurOnSubmit={false}
            returnKeyType="next"
            ref={emailRef}
            onChangeText={setEmail}
          />

          <FormInput
            value={password}
            icon="lock-outline"
            placeholder="Sua senha secreta"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            ref={passwordRef}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta
          </SubmitButton>

          <SignLink onPress={() => navigation.navigate('SignIn')}>
            <SignLinkText>Já tenho login</SignLinkText>
          </SignLink>
        </Form>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
