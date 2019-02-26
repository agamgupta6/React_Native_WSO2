# React Native Authentication with App Auth and Okta
 
This example app shows how to create a React Native application and authenticate with Okta.

[Click here](RN-README.md) to see the original README that's created by create-react-native-app.

Please read [Build a React Native Application and Authenticate with OAuth 2.0](https://developer.okta.com/blog/2018/03/16/build-react-native-authentication-oauth-2) to see how this app was created.

**Prerequisites:** [Node.js](https://nodejs.org/) and Xcode (for iOS/Mac) or Android Studio (for Android).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-react-native-app-auth-example.git
cd okta-react-native-app-auth-example
```

This will get a copy of the project installed locally.

### Create Native Application in Okta

Before you can run this React Native example, you'll need an application to authorize against. If you don't have an Okta Developer account, [get one today](https://developer.okta.com/signup/)!

Log in to your Okta Developer account and navigate to **Applications** > **Add Application**. Click **Native** and click the **Next** button. Give the app a name you’ll remember (e.g., `React Native`), select `Refresh Token` as a grant type, in addition to the default `Authorization Code`. Copy the **Login redirect URI** (e.g., `com.oktapreview.dev-123456:/callback`) and save it somewhere. You'll need this value when configuring your app.

Click **Done** and you should see a client ID next screen. Copy and save this value as well. 

### Specify Your Issuer, Client ID, and Redirect URI

Open `App.js` and adjust the initialization of `AppAuth` with your settings.

```js
auth = new AppAuth({
    issuer: 'https://{yourOktaDomain}.com/oauth2/default',
    clientId: '{clientId}',
    redirectUrl: 'com.{yourReversedOktaDomain}:/callback'
});
```

Update `ios/OktaRN/Info.plist` and `android/app/build.gradle` to replace the redirect scheme (`com.oktapreview.dev-158606`) with the one that matches your native app's redirect URI.

### Run the App

To run the app on iOS, you'll first need to install CocoaPods:

```bash
sudo gem install cocoapods
```

Then `cd` into the `ios` directory and run `pod install`. Then you can run the following command to start and deploy the app into iOS Simulator.

```bash
npm run ios
```

To run the app on Android, you'll have to an Android Virtual Device (AVD). Open Android Studio, select open existing project, and choose the `android` directory in your cloned project. If you're prompted to update anything, approve it.

To create a new AVD, navigate to **Tools** > **Android** > **AVD Manager**. Create a new Virtual Device and run it. I recommend using Pixel 2 with `Android API 27 x86`.
 
```bash
npm run android
```

## Links

This example uses the following libraries:

* [React Native App Auth](https://github.com/FormidableLabs/react-native-app-auth)

## Help

Please post any questions as issues on this project, or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if would like to create a support ticket.

## License

Apache 2.0, see [LICENSE](LICENSE).
