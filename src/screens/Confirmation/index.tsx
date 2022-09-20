import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootAuthStackParamList } from "../../routes/auth.routes";
import { RootStackParamList } from "../../routes/app.stack.routes";
import { ConfirmationDTO } from "../../dtos/ConfirmationDTO";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { ConfirmButton } from "../../components/ConfirmButton";

import { Container, Content, Title, Message, Footer } from "./styles";
import { useAuth } from "../../hooks/auth";

interface Params {
  data: ConfirmationDTO;
}

export function Confirmation() {
  const { user } = useAuth();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "Confirmation">
    >();

  const authNavigation =
    useNavigation<
      NativeStackNavigationProp<RootAuthStackParamList, "Confirmation">
    >();

  const { width } = useWindowDimensions();

  const route = useRoute();
  const { data } = route.params as Params;

  function handleConfirm() {
    if (user) {
      navigation.navigate(data.nextScreenRoute as any);
      return;
    }

    authNavigation.navigate(data.nextScreenRoute as any);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{data.title}</Title>

        <Message>{data.message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
