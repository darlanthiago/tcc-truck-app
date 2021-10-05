import React, { useCallback, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";

import * as Location from "expo-location";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { doTruncarStr } from "../../utils/trucateStr";
import Loading from "../../components/Loading";

const Truck = () => {
  const navigation = useNavigation();

  const [grantedStatus, setGrantedStatus] = useState(Boolean);
  const [loadingCoords, setLoadingCoords] = useState(false);
  const [fullAddress, setFullAddress] = useState(
    "Laguinho do Vovô - Av. Ivone Saad, Nº221 - Vila Bela, Formosa - GO, 73807-065"
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [schedules] = useState([
    { id: 1, day: "Segunda", initial_hour: 18, finish_hour: 22 },
    { id: 2, day: "Terça", initial_hour: 18, finish_hour: 22 },
    { id: 3, day: "Quarta", initial_hour: 18, finish_hour: 22 },
    { id: 4, day: "Quinta", initial_hour: 18, finish_hour: 22 },
    { id: 5, day: "Sexta", initial_hour: 18, finish_hour: 22 },
    { id: 6, day: "Sábado", initial_hour: 18, finish_hour: 22 },
  ]);

  const [items] = useState([
    {
      id: 1,
      name: "Cachorro-quente",
      description: "Cachorro-quente na chapa",
      price: 8.0,
      itemCategory: null,
    },
    {
      id: 2,
      name: "Hambúrguer",
      description: "Hambúguer de carne, com pão, cebola, queijo",
      price: 16.0,
      itemCategory: null,
    },
    {
      id: 3,
      name: "Coca-Cola",
      description: "Coca-cola 1,5L",
      price: 6.5,
      itemCategory: "Bebidas",
    },
    {
      id: 4,
      name: "Batata Frita",
      description: "Batata frita com queijo",
      price: 10.0,
      itemCategory: null,
    },
    {
      id: 5,
      name: "Batata Frita",
      description: "Batata frita com queijo",
      price: 10.0,
      itemCategory: null,
    },
  ]);

  useEffect(() => {
    navigation.setOptions({ title: "Olá, Darlan Thiago" });
  }, [navigation]);

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

    let response = await Location.reverseGeocodeAsync({ latitude, longitude });

    let fullAddressResponse = "";

    for (let item of response) {
      let address = `${item.street}, ${item.postalCode}, ${item.city} - ${item.region}`;

      fullAddressResponse = address;
    }

    setFullAddress(fullAddressResponse);

    setLoadingCoords(false);
  }, []);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        <View style={[styles.card, styles.cardWithCols]}>
          <View>
            <View style={styles.row}>
              <MaterialCommunityIcons
                name="truck-trailer"
                size={22}
                color="#313168"
              />
              <Text style={[styles.truckName, { marginLeft: 6 }]}>
                Gremmon Truck
              </Text>
            </View>
            <Text style={styles.truckMail}>truck@gremmon.com.br</Text>
            <Text style={styles.truckMail}>07.727.418/0001-44</Text>
            <Text style={styles.truckDesc}>Truck whos food is good</Text>
          </View>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Localização</Text>
        </View>

        <View style={[styles.card, styles.cardWithCols]}>
          <View style={styles.colContent}>
            <Text style={styles.truckName}>Minha localização:</Text>
            {loadingCoords ? (
              <Loading />
            ) : (
              <Text style={styles.addressText}>{fullAddress}</Text>
            )}
          </View>
          <View style={styles.colAction}>
            <TouchableOpacity
              style={[
                styles.buttonEdit,
                !grantedStatus && styles.buttonDisabled,
              ]}
              activeOpacity={0.9}
              onPress={getAddressLocation}
              disabled={!grantedStatus}
            >
              <MaterialIcons name="my-location" size={14} color="#0f3d20" />
              <Text style={styles.buttonEditText}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Horários de Funcionamento</Text>
        </View>

        <View style={[styles.card]}>
          <TouchableOpacity style={styles.buttonAdd} activeOpacity={0.9}>
            <MaterialIcons name="add" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={[styles.schedules]}>
            {schedules.map((item, index) => (
              <View style={styles.scheduleDay} key={index}>
                <Text style={styles.scheduleDayName}>{item.day}</Text>
                <Text style={styles.scheduleDayHour}>
                  {item.initial_hour}h - {item.finish_hour}h
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionText}>Itens</Text>
        </View>

        <View style={[styles.card]}>
          <View style={styles.cardWithCols}>
            <TouchableOpacity style={styles.buttonItems} activeOpacity={0.9}>
              <MaterialIcons name="add" size={20} color="#fff" />
              <Text style={styles.buttonItemsText}>Item</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonItems} activeOpacity={0.9}>
              <MaterialIcons name="add" size={20} color="#fff" />
              <Text style={styles.buttonItemsText}>Categoria</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemsContainer}>
            {items.map((item, index) => (
              <View style={styles.item} key={index}>
                <View style={styles.itemTitle}>
                  <Text style={styles.itemTitleText}>{item.name}</Text>
                  {item.itemCategory && (
                    <View style={styles.itemCategory}>
                      <Text style={styles.itemCategoryText}>
                        {String(item.itemCategory).toLowerCase()}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.itemDesc}>
                  {doTruncarStr(item.description, 20)}
                </Text>
                <View style={styles.itemPrice}>
                  <Text style={styles.itemPriceText}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 18,
    color: "#888",
    fontWeight: "bold",
  },
  card: {
    marginHorizontal: 10,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cardWithCols: {
    justifyContent: "space-between",
    alignContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  colContent: {
    maxWidth: "60%",
  },
  colAction: {
    maxWidth: "40%",
  },
  cardSecond: {
    marginVertical: 10,
  },
  truckName: {
    color: "#313168",
    fontSize: 22,
    fontWeight: "bold",
  },
  truckMail: {
    color: "#7d7fcc",
    fontSize: 12,
    fontWeight: "bold",
  },
  truckDesc: {
    marginTop: 20,
    color: "#9495c9",
    fontSize: 12,
  },
  buttonEdit: {
    backgroundColor: "#32FF7E",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonEditText: {
    color: "#0f3d20",
    marginHorizontal: 3,
    fontWeight: "bold",
    fontSize: 14,
  },
  addressText: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#5559c9",
  },
  schedules: {
    marginTop: 20,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  scheduleDay: {
    backgroundColor: "#5758BB",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 4,
    marginVertical: 5,
  },
  scheduleDayName: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  scheduleDayHour: {
    fontSize: 12,
    color: "#fff",
  },
  buttonAdd: {
    backgroundColor: "#5758BB",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 4,
  },
  buttonItems: {
    backgroundColor: "#5758BB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonItemsText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  itemsContainer: {
    marginTop: 30,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    backgroundColor: "#5758BB",
    margin: 5,
    padding: 8,
    borderRadius: 8,
  },
  itemTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemTitleText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  itemDesc: {
    fontSize: 12,
    marginBottom: 12,
    color: "#eee",
  },
  itemPrice: {
    backgroundColor: "#32FF7E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 6,
  },
  itemPriceText: {
    fontWeight: "bold",
    color: "#0e351c",
  },
  itemCategory: {
    backgroundColor: "#32FF7E",
    width: 50,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 4,
  },
  itemCategoryText: {
    fontSize: 10,
    color: "#0e351c",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Truck;
