import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Import your i18n config

import GetStarted from "./src/screens/GetStarted";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Feedback from "./src/screens/Feedback";
import Menu from "./src/screens/Menu";
import Chatbot from "./src/screens/Chatbot";
import PrimaryEducator from "./src/screens/PrimaryEducator";
import SecondaryEducator from "./src/screens/SecondaryEducator";
import Notifications from "./src/screens/Notifications";

const Stack = createStackNavigator();

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Chatbot" component={Chatbot} />
          <Stack.Screen name="PrimaryEducator" component={PrimaryEducator} />
          <Stack.Screen name="SecondaryEducator" component={SecondaryEducator} />
          <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}
