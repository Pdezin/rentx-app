import React from "react";
import { StatusBar } from "expo-status-bar";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Logo from "../../assets/logo.svg";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

import { Car } from "../../components/Car";

import { RootStackParamList } from "../../routes/stack.routes";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export function Home() {
  const navigation = useNavigation<HomeScreenProp>();

  const carData = {
    brand: "AUDI",
    name: "RS 5 Coupé",
    rent: {
      period: "AO DIA",
      price: 120,
    },
    thumbnail:
      "https://pensecarros.com.br/cms/uploads/audi-rs5-2-9-v6-tfsi-gasolina-sportback-quattro-s-tronic-6130309e27d5e.png",
  };

  function handleCarDetails() {
    navigation.navigate("CarDetails");
  }

  return (
    <Container>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car data={carData} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
