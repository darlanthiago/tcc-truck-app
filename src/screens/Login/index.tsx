import React from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Digite o email" />
      <TextInput style={styles.input} placeholder="Digite a senha" />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("Truck");
        }}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.linkText}>Não tenho conta</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ddd",
    width: "100%",
    height: 45,
    borderRadius: 8,
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#5758BB",
    height: 45,
    borderRadius: 8,
    marginVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
  link: {
    width: "100%",
    height: 45,
    borderRadius: 8,
    marginVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    color: "#0d6efd",
  },
});
