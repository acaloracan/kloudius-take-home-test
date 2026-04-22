# User Authentication App

This is a React Native app demonstrating authentication flows using React Context API, React Navigation, and React Native Paper. It features Login, Signup, and Home screens with persistent authentication using AsyncStorage.

## Features

- **Authentication Context**: Global state management for user authentication (login, signup, logout, user info).
- **Login Screen**: Email and password fields, validation, error messages, and navigation to Signup.
- **Signup Screen**: Name, email, password fields, validation, error messages, and navigation to Login.
- **Home Screen**: Displays logged-in user's name and email, with a logout button.
- **Persistent Auth**: User stays logged in after app restart (AsyncStorage).
- **Navigation**: Seamless navigation between Login, Signup, and Home screens.
- **Modern UI**: Clean, accessible design using React Native Paper.
- **Password Visibility Toggle**: Eye icon to show/hide password fields.

## Setup Instructions

1. **Install dependencies**
   ```sh
   yarn install
   # or
   npm install
   ```
2. **iOS only**: Install CocoaPods dependencies
   ```sh
   cd ios && pod install && cd ..
   ```
3. **Start Metro**
   ```sh
   yarn start
   # or
   npm start
   ```
4. **Run the app**
   ```sh
   yarn ios   # for iOS
   yarn android   # for Android
   # or
   npm run ios
   npm run android
   ```

## Screenshots

Add screenshots or a short video here to demonstrate the app's functionality.
|Screen|Screenshots|Recording|
|---|---|---|
|Login|![Login](https://github.com/acaloracan/kloudius-take-home-test/blob/d195b9bb8b5417358df36968c50ead8918090a0a/assets/screenshots/login.png?raw=true)| <video src="https://github.com/acaloracan/kloudius-take-home-test/blob/d195b9bb8b5417358df36968c50ead8918090a0a/assets/video/login%20flow.mov?raw=true" controls width="400"></video> |
|Signup|![Signup](https://github.com/acaloracan/kloudius-take-home-test/blob/d195b9bb8b5417358df36968c50ead8918090a0a/assets/screenshots/signup.png?raw=true)| <video src="https://github.com/acaloracan/kloudius-take-home-test/blob/d195b9bb8b5417358df36968c50ead8918090a0a/assets/video/signup%20flow.mov?raw=true" controls width="400"></video>
|Home|![Home](https://github.com/acaloracan/kloudius-take-home-test/blob/d195b9bb8b5417358df36968c50ead8918090a0a/assets/screenshots/home.png?raw=true)|<video src="https://github.com/acaloracan/kloudius-take-home-test/blob/d195b9bb8b5417358df36968c50ead8918090a0a/assets/video/logout.mov?raw=true" controls width="400"></video>
