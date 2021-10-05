import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>
      <TextInput style={styles.input} placeholder="Digite o nome" />
      <TextInput
        style={styles.input}
        placeholder="Digite o email"
        keyboardType="email-address"
      />
      <TextInput style={styles.input} placeholder="Digite a senha" />
      <TextInput style={styles.input} placeholder="Digite a descrição" />
      <TextInput
        style={styles.input}
        placeholder="Digite o documento"
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.button} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.linkText}>Ja tenho uma conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
