import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const SignOutButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={styles.buttonText}>Sair</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fc5656",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff",
  },
});

export default SignOutButton;
