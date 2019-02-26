import React, { Component } from 'react';
import { Alert, UIManager, LayoutAnimation } from 'react-native';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import { Page, Button, ButtonContainer, Form, Heading } from './components';
import { Buffer } from 'buffer';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

  type State = {
    hasLoggedInOnce: boolean,
    accessToken: ?string,
    accessTokenExpirationDate: ?string,
    refreshToken: ?string,
    idToken: ?string,
    beers: []
  };

const config = {
  issuer: 'https://192.168.0.105:9443/oauth2/token',
  serviceConfiguration: {
    authorizationEndpoint:'https://192.168.0.105:9443/oauth2/authorize',
    tokenEndpoint:'https://192.168.0.105:9443/oauth2/token',
    revocationEndpoint:'http://192.168.0.105:9763/oauth2/revoke'
    
  },
  clientId: 'BNgnKGCTG4Hr6XR_SYkA0Ac2X9Ia',
  redirectUrl: 'com.oktapreview.dev-602515:/callback',
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  dangerouslyAllowInsecureHttpRequests: true
};


export default class App extends Component<{}, State> {
  state = {
    hasLoggedInOnce: false,
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
    idToken: '',
    beers: []
  };

  animateState(nextState: $Shape<State>, delay: number = 0) {
    setTimeout(() => {
      this.setState(() => {
        LayoutAnimation.easeInEaseOut();
        return nextState;
      });
    }, delay);
  }

  authorize = async () => {
    try {
      const authState = await authorize(config);
      this.animateState(
        {
          hasLoggedInOnce: true,
          accessToken: authState.accessToken,
          accessTokenExpirationDate: authState.accessTokenExpirationDate,
          refreshToken: authState.refreshToken,
          idToken: authState.idToken
        },
        500
      );
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  };

  refresh = async () => {
    try {
      const authState = await refresh(config, {
        refreshToken: this.state.refreshToken
      });

      this.animateState({
        accessToken: authState.accessToken || this.state.accessToken,
        accessTokenExpirationDate:
          authState.accessTokenExpirationDate || this.state.accessTokenExpirationDate,
        refreshToken: authState.refreshToken || this.state.refreshToken
      });
    } catch (error) {
      Alert.alert('Failed to refresh token', error.message);
    }
  };
  
  fetchGoodBeers = async () => {
    if (this.state.beers.length) {
      // reset to id token if beers is already populated
      this.animateState({beers: []})
    } else {
      try {
        const response = await fetch('http://192.168.0.60:8080/good-beers', {
          headers: {
            'Authorization': `Bearer ${this.state.accessToken}`
          }
        });
        const data = await response.json();
        this.animateState({beers: data});
      } catch(error) {
        console.error(error);
      }
    }
  };

  revoke = async () => {
    try {
      await revoke(config, {
        tokenToRevoke: this.state.accessToken,
        sendClientId: true
      });
      this.animateState({
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: '',
        beers: []
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      Alert.alert('Failed to revoke token with ', error.message);
    }
  };

  render() {
    const {state} = this;
    if (state.idToken) {
      const jwtBody = state.idToken.split('.')[1];
      const base64 = jwtBody.replace('-', '+').replace('_', '/');
      const decodedJwt = Buffer.from(base64, 'base64');
      state.idTokenJSON = JSON.parse(decodedJwt);
    }
    return (
      <Page>
        {!!state.accessToken ? (
          <Form>
            <Heading>{state.hasLoggedInOnce ? 'Hello ' + state.idTokenJSON.sub : ''}</Heading>
            <Form.Label>accessToken</Form.Label>
            <Form.Value>{state.accessToken}</Form.Value>
            <Form.Label>{state.beers.length ? 'Good Beers' : 'ID Token'}</Form.Label>
            <Form.Value>{JSON.stringify(state.beers.length ? state.beers : state.idTokenJSON)}</Form.Value>
            <Form.Label>accessTokenExpirationDate</Form.Label>
            <Form.Value>{state.accessTokenExpirationDate}</Form.Value>
            <Form.Label>refreshToken</Form.Label>
            <Form.Value>{state.refreshToken}</Form.Value>
            
          </Form>
          
        ) : (
          <Heading>{state.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Heading>
        )}

        <ButtonContainer>
          {!state.accessToken && (
            <Button onPress={this.authorize} text="Authorize" color="#017CC0"/>
          )}
          {!!state.refreshToken && <Button onPress={this.refresh} text="Refresh" color="#24C2CB"/>}
          {!!state.accessToken && <Button onPress={this.revoke} text="Revoke" color="#EF525B"/>}
          
        </ButtonContainer>
      </Page>
    );
  }
}