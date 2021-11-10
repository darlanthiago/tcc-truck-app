import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "native-base";
import { api } from "../../../services/api";

type Truck = {
  id: string;
  name: string;
  email: string;
  address_id?: string;
};

type Schedule = {
  id: string;
  truck_id: string;
  day: string;
  initial_hour: number;
  finish_hour: number;
};

type ScheduleToAdd = {
  day: string;
  initial_hour: number;
  finish_hour: number;
};

type AuthContextType = {
  login(email: string, password: string): Promise<void>;
  logout(): void;
  updateTruck(address_id: string | null): Promise<void>;
  signedTruck: Truck;
  isSigned: boolean;
  isLoading: boolean;
  schedules: Schedule[];
  addSchedule({ day, initial_hour, finish_hour }: ScheduleToAdd): Promise<void>;
  removeSchedule(scheduleId: string): Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

const Auth: React.FC = ({ children }) => {
  const toast = useToast();

  const [signedTruck, setSignedTruck] = useState({} as Truck);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [token, truck] = await AsyncStorage.multiGet([
        "@FindFood:token",
        "@FindFood:truck",
      ]);

      if (token[1] && truck[1]) {
        const truckFromStorage = JSON.parse(truck[1]);

        api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
          token[1]
        )}`;

        const response = await api.get(`/truck/${truckFromStorage.id}`, {
          headers: {
            relationships: '["schedules"]',
          },
        });

        await AsyncStorage.mergeItem(
          "@FindFood:truck",
          JSON.stringify(response.data)
        );

        setSignedTruck(response.data);

        setSchedules(response.data.schedules);

        setIsLoading(false);
        setIsSigned(true);
      } else {
        setSignedTruck({} as Truck);
        setIsLoading(false);
        setIsSigned(false);
      }
    })();
  }, []);

  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);

      await api
        .post("/loginByTruck", { email, password })
        .then(async (resp) => {
          await AsyncStorage.multiSet([
            ["@FindFood:token", JSON.stringify(resp.data.token)],
            ["@FindFood:truck", JSON.stringify(resp.data.truck)],
          ]);

          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${resp.data.token}`;

          const { id, name, email, address_id } = resp.data.truck;

          setSignedTruck({ id, name, email, address_id });

          setIsLoading(false);

          setIsSigned(true);

          toast.show({
            placement: "top",
            title: "Sucesso",
            status: "success",
            description: "Login efetuado",
          });
        })
        .catch(async (err) => {
          setIsSigned(false);

          await AsyncStorage.multiRemove([
            "@FindFood:token",
            "@FindFood:truck",
          ]);

          setIsLoading(false);

          toast.show({
            placement: "top",
            title: "Ops!",
            status: "error",
            description: "Verifique os dados e tente novamente",
          });
        });
    },
    [toast]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);

    await AsyncStorage.multiRemove(["@FindFood:token", "@FindFood:truck"]);

    delete api.defaults.headers.common["Authorization"];

    setIsSigned(false);
    setIsLoading(false);
  }, []);

  const updateTruck = useCallback(
    async (address_id: string | null) => {
      const data = { address_id };

      await api.put(`truck/${signedTruck.id}`, data).then(async (response) => {
        setSignedTruck(response.data);
        await AsyncStorage.mergeItem(
          "@FindFood:truck",
          JSON.stringify(response.data)
        );
      });
    },
    [signedTruck]
  );

  const addSchedule = useCallback(
    async ({ day, initial_hour, finish_hour }: ScheduleToAdd) => {
      const dataToAdd = {
        day,
        initial_hour,
        finish_hour,
        truck_id: signedTruck.id,
      };

      const response = await api.post(`/schedule`, dataToAdd);

      setSchedules([...schedules, response.data]);
    },
    [schedules]
  );

  const removeSchedule = useCallback(
    async (scheduleId: string) => {
      await api.delete(`/schedule/${scheduleId}`);

      const filterdSchedules = schedules.filter((sch) => sch.id !== scheduleId);

      setSchedules(filterdSchedules);
    },
    [schedules]
  );

  return (
    <AuthContext.Provider
      value={{
        signedTruck,
        updateTruck,
        login,
        logout,
        isSigned,
        isLoading,
        schedules,
        addSchedule,
        removeSchedule,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useRNAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}

export { useRNAuth, Auth, AuthContext };
