import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { RootStackParamList } from "../../routes/stack.routes";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenProp>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
