import React from "react";

import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "react-native";

import { Auth } from "./hooks/contexts/Auth";

import { Routes } from "./routes";

export default function Index() {
  return (
    <NativeBaseProvider>
      <Auth>
        <NavigationContainer>
          <StatusBar
            backgroundColor="#5758BB"
            barStyle="light-content"
            networkActivityIndicatorVisible={false}
            hidden
          />
          <Routes />
        </NavigationContainer>
      </Auth>
    </NativeBaseProvider>
  );
}
