import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/Login";
import { RegisterScreen } from "../screens/Register";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const GuestStack = createNativeStackNavigator<RootStackParamList>();

export const PublicRoutes = () => {
  return (
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
  );
};
