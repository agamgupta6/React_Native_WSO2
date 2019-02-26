export type State = {
  hasLoggedInOnce: boolean;
  accessToken: ?string;
  accessTokenExpirationDate: ?string;
  refreshToken: ?string;
  idToken: ?string;
  beers: [];
};
