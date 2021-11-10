import React, { useCallback, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/public.routes";
import { useToast } from "native-base";
import { useRNAuth } from "../../hooks/contexts/Auth";

type loginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

type LoginProps = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const navigation = useNavigation<loginScreenProp>();
  const toast = useToast();
  const { login, isLoading } = useRNAuth();

  const [loginData, setLoginData] = useState({} as LoginProps);

  const handleLogin = useCallback(async () => {
    const { email, password } = loginData;

    if (!email && !password) {
      toast.show({
        placement: "top",
        title: "Ops!",
        status: "error",
        description: "Adicione todos os dados",
      });

      return;
    }

    await login(email, password);
  }, [toast, loginData]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o email"
        onChangeText={(text) => setLoginData({ ...loginData, email: text })}
        value={loginData.email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a senha"
        onChangeText={(text) => setLoginData({ ...loginData, password: text })}
        value={loginData.password}
        autoCapitalize="none"
        keyboardType="visible-password"
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Aguarde ..." : "Entrar"}
        </Text>
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
