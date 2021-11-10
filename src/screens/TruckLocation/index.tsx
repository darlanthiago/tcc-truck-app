import React, { useCallback, useEffect, useState } from "react";

import { Alert, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Modal as ModalNative, useToast } from "native-base";

import Loading from "../../components/Loading";

import { styles } from "../../styles/styles";
import { api } from "../../services/api";
import { useRNAuth } from "../../hooks/contexts/Auth";
import { formatAddress } from "../../utils/formatAddress";
import { isEmpty } from "../../utils/objectHelper";

type Address = {
  id: string;
  street_name: string;
  street_number: string;
  neighborhood: string;
  zipcode: string;
  city: string;
  state: string;
};

type ReverseLocation = {
  city: string | null;
  country: string | null;
  district: string | null;
  name: string | null;
  postalCode: string | null;
  region: string | null;
  street: string | null;
};

type Coords = {
  latitude: number;
  longitude: number;
};

const TruckLocation: React.FC = () => {
  const { signedTruck, updateTruck } = useRNAuth();
  const toast = useToast();

  const [address, setAddress] = useState({} as Address);
  const [location, setLocation] = useState({} as ReverseLocation);
  const [coords, setCoords] = useState({} as Coords);
  const [grantedStatus, setGrantedStatus] = useState(Boolean);
  const [loadingCoords, setLoadingCoords] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      if (signedTruck.address_id) {
        const response = await api.get(`/address/${signedTruck.address_id}`);
        setAddress(response.data);
      }
    })();
  }, [signedTruck]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      setGrantedStatus(status === "granted" ? true : false);

      if (status !== "granted") {
        Alert.alert(
          "Ops!",
          "Para poder usar a localização precisa dar permissão"
        );
        return;
      }
    })();
  }, []);

  const getAddressLocation = useCallback(async () => {
    setLoadingCoords(true);

    let location = await Location.getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;

    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const {
      city,
      country,
      district,
      name,
      postalCode,
      region,
      street,
    } = response[0];

    setLocation({ city, country, district, name, postalCode, region, street });

    setCoords({ latitude, longitude });

    setModalVisible(!modalVisible);

    setLoadingCoords(false);
  }, [modalVisible]);

  const handleUpdateAddress = useCallback(async () => {
    if (!isEmpty(address)) {
      await api
        .put(`/address/${address.id}`, {
          street_name: location.name,
          neighborhood: location.district,
          zipcode: location.postalCode,
          city: location.city,
          state: location.region,
        })
        .then(async (resp) => {
          setAddress(resp.data);
          await updateTruck(resp.data.id);
          toast.show({
            placement: "top",
            title: "Sucesso",
            status: "success",
            description: "Endereço atualizado",
          });
        });
    } else {
      const { data } = await api.post(`/address`, {
        street_name: location.name,
        neighborhood: location.district,
        zipcode: location.postalCode,
        city: location.city,
        state: location.region,
      });

      await updateTruck(data.id);

      setAddress(data);

      toast.show({
        placement: "top",
        title: "Sucesso",
        status: "success",
        description: "Endereço adicionado",
      });
    }

    setModalVisible(!modalVisible);
    setLocation({} as ReverseLocation);
  }, [signedTruck, updateTruck, address, modalVisible, toast]);

  return (
    <>
      <View style={[styles.card, styles.cardWithCols]}>
        <View style={styles.colContent}>
          <Text style={styles.truckName}>Minha localização:</Text>
          {loadingCoords ? (
            <Loading />
          ) : (
            <Text style={styles.addressText}>
              {address
                ? formatAddress(
                    address.street_name,
                    address.city,
                    address.state
                  )
                : "Nenhum Endereço"}
            </Text>
          )}
        </View>
        <View style={styles.colAction}>
          <TouchableOpacity
            style={[styles.buttonEdit, !grantedStatus && styles.buttonDisabled]}
            activeOpacity={0.9}
            onPress={getAddressLocation}
            disabled={!grantedStatus}
          >
            <MaterialIcons name="my-location" size={14} color="#0f3d20" />
            <Text style={styles.buttonEditText}>Alterar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ModalNative
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
        avoidKeyboard
      >
        <ModalNative.Content>
          <ModalNative.CloseButton />
          <ModalNative.Header>Deseja alterar a localização?</ModalNative.Header>
          <ModalNative.Body>
            <Text style={styles.nowLocationText}>
              De:{" "}
              {isEmpty(address)
                ? "Nenhum Endereço"
                : formatAddress(
                    address.street_name,
                    address.city,
                    address.state
                  )}
            </Text>
            <Text style={styles.toLocationText}>
              Para:{" "}
              {formatAddress(location.name, location.city, location.region)}
            </Text>
          </ModalNative.Body>
          <ModalNative.Footer>
            <TouchableOpacity
              style={[styles.buttonEdit]}
              activeOpacity={0.9}
              onPress={handleUpdateAddress}
            >
              <MaterialIcons name="save" size={14} color="#0f3d20" />
              <Text style={styles.buttonEditText}>Confirmar</Text>
            </TouchableOpacity>
          </ModalNative.Footer>
        </ModalNative.Content>
      </ModalNative>
    </>
  );
};

export default TruckLocation;
