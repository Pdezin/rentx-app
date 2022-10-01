import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CarDTO } from "../dtos/CarDTO";
import { Car as ModelCar } from "../database/models/Car";
import { ConfirmationDTO } from "../dtos/ConfirmationDTO";

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";

export type RootStackParamList = {
  Cars: undefined;
  CarDetails: {
    car: ModelCar;
  };
  Scheduling: {
    car: CarDTO;
  };
  SchedulingDetails: {
    car: CarDTO;
    dates: string[];
  };
  Confirmation: {
    data: ConfirmationDTO;
  };
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Cars">
      <Screen name="Cars" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
