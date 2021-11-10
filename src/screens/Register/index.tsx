import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useToast } from "native-base";
import React, { useCallback, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RootStackParamList } from "../../routes/public.routes";
import { api } from "../../services/api";
import { removeEspecialCharacters } from "../../utils/documentFormat";

type Truck = {
  name: string;
  email: string;
  cnpj?: string;
  description: string;
  password: string;
};

type registerScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

export const RegisterScreen = () => {
  const toast = useToast();
  const navigation = useNavigation<registerScreenProp>();
  const [newTruck, setNewTruck] = useState({} as Truck);
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async () => {
    const { name, email, cnpj, description, password } = newTruck;

    setIsLoading(true);

    if (!name && !email && !password && !description) {
      toast.show({
        placement: "top",
        title: "Ops!",
        status: "error",
        description: "Adicione todos os dados",
      });

      setIsLoading(false);
      return;
    }

    const truckToAdd = {
      name,
      email,
      document: cnpj ? removeEspecialCharacters(cnpj) : null,
      description,
      password,
    };

    await api
      .post("/truck", truckToAdd)
      .then((resp) => {
        setIsLoading(false);

        toast.show({
          placement: "top",
          title: "Sucesso",
          status: "success",
          description: "Ambulante adicionado com sucesso",
        });

        navigation.navigate("Login");
        return;
      })
      .catch((error) => {
        setIsLoading(false);

        toast.show({
          placement: "top",
          title: "Ops!",
          status: "error",
          description: "Verifique os dados e tente novamente",
        });

        return;
      });
  }, [toast]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Cadastrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        onChangeText={(text) => setNewTruck({ ...newTruck, name: text })}
        value={newTruck.name}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setNewTruck({ ...newTruck, email: text })}
        value={newTruck.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a senha"
        keyboardType="visible-password"
        autoCapitalize="none"
        onChangeText={(text) => setNewTruck({ ...newTruck, password: text })}
        value={newTruck.password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a descrição"
        onChangeText={(text) => setNewTruck({ ...newTruck, description: text })}
        value={newTruck.description}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o documento"
        keyboardType="number-pad"
        onChangeText={(text) => setNewTruck({ ...newTruck, cnpj: text })}
        value={newTruck.cnpj}
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={create}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Aguarde ..." : "Cadastrar"}
        </Text>
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
