import { useNavigation } from "@react-navigation/core";
import {
  Heading,
  HStack,
  Spinner,
  useToast,
  Modal as ModalNative,
  Stack,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRNAuth } from "../../hooks/contexts/Auth";
import { api } from "../../services/api";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { formatCnpj } from "../../utils/documentFormat";

import { styles } from "../../styles/styles";

type Truck = {
  name: string;
  email: string;
  document?: string;
  description: string;
  additional_information?: string;
  address_id?: string;
};

const TruckInfo: React.FC = () => {
  const navigation = useNavigation();

  const toast = useToast();

  const { signedTruck, logout } = useRNAuth();

  const [loading, setLoading] = useState(false);

  const [truck, setTruck] = useState({} as Truck);

  const [updateTruck, setUpdateTruck] = useState({} as Truck);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      await api
        .get(`/truck/${signedTruck.id}`)
        .then((resp) => {
          setTruck(resp.data);
          setUpdateTruck(resp.data);
          navigation.setOptions({ title: resp.data.name });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

          logout();

          toast.show({
            placement: "top",
            title: "Ops!",
            status: "error",
            description:
              "Não foi possível encontrar o Ambulante, tente novamente",
          });
        });
    })();
  }, []);

  const handleUpdateTruck = useCallback(async () => {
    const { name, description } = updateTruck;

    await api
      .put(`/truck/${signedTruck.id}`, { name, description })
      .then((resp) => {
        setTruck(resp.data);

        setModalVisible(!modalVisible);

        navigation.setOptions({ title: resp.data.name });

        toast.show({
          placement: "top",
          title: "Sucesso",
          status: "success",
          description: `${resp.data.name}, foi alterado com sucesso!`,
        });

        return;
      })
      .catch((error) => {
        toast.show({
          placement: "top",
          title: "Ops!",
          status: "error",
          description: `Não foi possível de alterar o ambulante!`,
        });
      });
  }, [updateTruck, modalVisible, navigation]);

  return (
    <>
      <Stack space={2} style={styles.card}>
        {loading ? (
          <HStack space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" color="indigo.500" />
            <Heading color="indigo.500" fontSize="md">
              Loading
            </Heading>
          </HStack>
        ) : (
          <>
            <MaterialCommunityIcons
              name="truck-trailer"
              size={22}
              color="#313168"
            />
            <Text style={[styles.truckName, { marginLeft: 6 }]}>
              {truck.name}
            </Text>
          </>
        )}
        <Text style={styles.truckMail}>{truck.email}</Text>
        {truck.document && (
          <Text style={styles.truckMail}>{formatCnpj(truck.document)}</Text>
        )}
        <Text style={styles.truckDesc}>{truck.description}</Text>

        <View>
          <TouchableOpacity
            style={styles.buttonEdit}
            activeOpacity={0.9}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <MaterialIcons name="edit" size={14} color="#0f3d20" />
            <Text style={styles.buttonEditText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </Stack>

      <ModalNative
        isOpen={modalVisible}
        onClose={() => setModalVisible(!modalVisible)}
        avoidKeyboard
      >
        <ModalNative.Content>
          <ModalNative.CloseButton />
          <ModalNative.Header>Editar Truck</ModalNative.Header>
          <ModalNative.Body>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Ambulante"
              placeholderTextColor="#7a7979"
              onChangeText={(text) =>
                setUpdateTruck({ ...updateTruck, name: text })
              }
              value={updateTruck.name}
            />
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail do Ambulante"
              placeholderTextColor="#7a7979"
              value={updateTruck.email}
              onChangeText={(text) =>
                setUpdateTruck({ ...updateTruck, email: text })
              }
            />
            <Text style={styles.label}>CNPJ</Text>
            <TextInput
              style={styles.input}
              placeholder="CNPJ do Ambulante"
              placeholderTextColor="#7a7979"
              value={updateTruck.document}
              onChangeText={(text) =>
                setUpdateTruck({ ...updateTruck, document: text })
              }
            />
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder="Descrição do Ambulante"
              placeholderTextColor="#7a7979"
              value={updateTruck.description}
              onChangeText={(text) =>
                setUpdateTruck({ ...updateTruck, description: text })
              }
            />
            <TouchableOpacity
              style={[styles.buttonEdit, { marginTop: 30 }]}
              activeOpacity={0.9}
              onPress={handleUpdateTruck}
            >
              <MaterialIcons name="save" size={14} color="#0f3d20" />

              <Text style={styles.buttonEditText}>Salvar</Text>
            </TouchableOpacity>
          </ModalNative.Body>
        </ModalNative.Content>
      </ModalNative>
    </>
  );
};

export default TruckInfo;
