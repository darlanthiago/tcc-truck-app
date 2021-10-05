import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./src/screens/Login";

import { StatusBar } from "react-native";

import { RegisterScreen } from "./src/screens/Register";
import Truck from "./src/screens/Truck";
import SignOutButton from "./src/components/SignOutButton";

const AppStack = createNativeStackNavigator();
const GuestStack = createNativeStackNavigator();

export default function App() {
  const isSigned = true;

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#5758BB"
        barStyle="light-content"
        networkActivityIndicatorVisible={false}
        hidden
      />

      {isSigned ? (
        <AppStack.Navigator initialRouteName="Truck">
          <AppStack.Screen
            name="Truck"
            component={Truck}
            options={{
              title: "Meu Truck",
              headerLeft: () => false,
              headerRight: () => <SignOutButton />,
            }}
          />
        </AppStack.Navigator>
      ) : (
        <GuestStack.Navigator initialRouteName="Login">
          <GuestStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <GuestStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </GuestStack.Navigator>
      )}
    </NavigationContainer>
  );
}
