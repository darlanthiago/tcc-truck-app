import React, { useCallback, useEffect, useState } from "react";
import { Linking, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "../../styles/styles";
import { useToast, Modal as ModalNative } from "native-base";
import { useRNAuth } from "../../hooks/contexts/Auth";
import { isEmpty } from "../../utils/objectHelper";
import { api } from "../../services/api";

type Schedule = {
  id: string;
  day: string;
  initial_hour: string;
  finish_hour: string;
};

const TruckSchedule: React.FC = () => {
  const toast = useToast();

  const { schedules, addSchedule, removeSchedule } = useRNAuth();

  const [modalScheduleVisible, setModalScheduleVisible] = useState(false);

  const [newSchedule, setNewSchedule] = useState<Schedule>({} as Schedule);

  const handleAddNewSchedule = useCallback(async () => {
    const { day, initial_hour, finish_hour } = newSchedule;

    if (!day && !initial_hour && !finish_hour) {
      toast.show({
        placement: "top",
        title: "Ops!",
        status: "error",
        description: "Adicione todos os dados",
      });
      return;
    }

    if (initial_hour >= finish_hour) {
      toast.show({
        placement: "top",
        title: "Ops!",
        status: "error",
        description: "Horário de fim menor que o de início",
      });
      return;
    }

    const addNewSchedule = {
      day: day,
      initial_hour: Number(initial_hour),
      finish_hour: Number(finish_hour),
    };

    await addSchedule(addNewSchedule);

    setNewSchedule({} as Schedule);

    setModalScheduleVisible(!modalScheduleVisible);

    toast.show({
      placement: "top",
      title: "Sucesso",
      status: "success",
      description: "Horário adicionado",
    });
  }, [newSchedule, schedules, modalScheduleVisible, toast]);

  const handleRemoveSchedule = useCallback(
    async (scheduleId) => {
      await removeSchedule(scheduleId);

      setNewSchedule({} as Schedule);

      toast.show({
        placement: "top",
        title: "Sucesso",
        status: "success",
        description: "Horário removido",
      });
    },
    [toast, schedules]
  );

  return (
    <>
      <View style={[styles.card]}>
        <TouchableOpacity
          style={styles.buttonAdd}
          activeOpacity={0.9}
          onPress={() => {
            setModalScheduleVisible(!modalScheduleVisible);
          }}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={[styles.schedules]}>
          {!isEmpty(schedules) ? (
            schedules.map((item, index) => (
              <TouchableOpacity
                style={styles.scheduleDay}
                key={index}
                activeOpacity={0.9}
                delayLongPress={500}
                onLongPress={() => {
                  handleRemoveSchedule(item.id);
                }}
              >
                <Text style={styles.scheduleDayName}>{item.day}</Text>
                <Text style={styles.scheduleDayHour}>
                  {item.initial_hour}h - {item.finish_hour}h
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.sectionText}>Nenhum Horário</Text>
          )}
        </View>
      </View>
      <ModalNative
        isOpen={modalScheduleVisible}
        onClose={() => setModalScheduleVisible(!modalScheduleVisible)}
        avoidKeyboard
      >
        <ModalNative.Content>
          <ModalNative.CloseButton />
          <ModalNative.Header>Horários de Funcionamento</ModalNative.Header>
          <ModalNative.Body>
            <Text style={styles.label}>Dia de Funcionamento</Text>
            <TextInput
              style={styles.input}
              placeholder="Dia de Funcionamento"
              placeholderTextColor="#7a7979"
              onChangeText={(text) => {
                setNewSchedule({ ...newSchedule, day: text });
              }}
              value={newSchedule.day}
            />

            <Text style={styles.label}>Hora de Inicio</Text>
            <TextInput
              style={styles.input}
              placeholder="Hora de Inicio"
              placeholderTextColor="#7a7979"
              keyboardType="numeric"
              onChangeText={(text) => {
                setNewSchedule({ ...newSchedule, initial_hour: text });
              }}
              value={newSchedule?.initial_hour}
            />

            <Text style={styles.label}>Hora de Fim</Text>
            <TextInput
              style={styles.input}
              placeholder="Hora de Fim"
              placeholderTextColor="#7a7979"
              keyboardType="numeric"
              onChangeText={(text) => {
                setNewSchedule({ ...newSchedule, finish_hour: text });
              }}
              value={newSchedule?.finish_hour}
            />

            <TouchableOpacity
              style={[styles.buttonEdit, { marginTop: 30 }]}
              activeOpacity={0.9}
              onPress={handleAddNewSchedule}
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

export default TruckSchedule;
