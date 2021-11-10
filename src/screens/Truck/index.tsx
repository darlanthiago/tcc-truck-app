import React from "react";

import { SafeAreaView, View, Text, ScrollView } from "react-native";

import TruckInfo from "../TruckInfo";
import TruckLocation from "../TruckLocation";
import TruckSchedule from "../TruckSchedule";
import TruckItemsCategories from "../TruckItemsCategories";

import { styles } from "../../styles/styles";

const Truck = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TruckInfo />
        <View style={styles.section}>
          <Text style={styles.sectionText}>Localização</Text>
        </View>
        <TruckLocation />
        <View style={styles.section}>
          <Text style={styles.sectionText}>Horários de Funcionamento</Text>
        </View>
        <TruckSchedule />
        <View style={styles.section}>
          <Text style={styles.sectionText}>Itens</Text>
        </View>
        <TruckItemsCategories />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Truck;
