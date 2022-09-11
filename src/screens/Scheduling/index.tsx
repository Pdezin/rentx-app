import React, { useState } from "react";
import { StatusBar, Alert } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format } from "date-fns";

import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";

import { generateInterval } from "../../components/Calendar/generateInterval";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  MarketDatesProps,
} from "../../components/Calendar";

import ArrowSvg from "../../assets/arrow.svg";
import { RootStackParamList } from "../../routes/stack.routes";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
  ButtonWrapper,
} from "./styles";

type SchedulingScreenProp = NativeStackNavigationProp<RootStackParamList>;

interface Params {
  car: CarDTO;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation<SchedulingScreenProp>();

  const route = useRoute();
  const { car } = route.params as Params;

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );

  const [markedDates, setMarkedDates] = useState<MarketDatesProps>(
    {} as MarketDatesProps
  );

  const [rentalPeriods, setRentalPeriods] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  function handleConfirmRental() {
    if (!rentalPeriods.startFormatted || !rentalPeriods.endFormatted) {
      Alert.alert("Selecione o intervalo para alugar");
    } else {
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriods({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <ButtonWrapper>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
        </ButtonWrapper>

        <Title>
          Escolha uma{"\n"}
          data de início e{"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriods.startFormatted}>
              {rentalPeriods.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriods.endFormatted}>
              {rentalPeriods.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriods.endFormatted}
        />
      </Footer>
    </Container>
  );
}
