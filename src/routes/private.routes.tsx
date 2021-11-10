import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Truck from "../screens/Truck";

import SignOutButton from "../components/SignOutButton";

export type RootStackParamList = {
  Truck: undefined;
};

const AppStack = createNativeStackNavigator<RootStackParamList>();

export const PrivateRoutes = () => {
  return (
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
  );
};
