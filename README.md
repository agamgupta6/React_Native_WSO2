# React Native Authentication with App Auth and Okta
 
This example app shows how to create a React Native application and authenticate with WSO2.


## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/agamgupta6/React_Native_WSO2.git
cd React_Native_WSO2
npm install

```
This will get a copy of the project installed locally.
Update sdk location in android/local.properties. 
Create SP in WSO2 and change the configuration in App.js. Run following command.

```bash
 sudo react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

