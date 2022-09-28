import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../hooks/auth";

import { BackButton } from "../../components/BackButton";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";

import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>({} as ScrollView);
  const { user } = useAuth();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {}

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    setOption(optionSelected);
  }

  useEffect(() => {
    const scrollViewToEnd = Keyboard.addListener("keyboardDidShow", () => {
      scrollViewRef?.current?.scrollToEnd();
    });

    return () => {
      scrollViewToEnd.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView ref={scrollViewRef}>
        <Container>
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.colors.header}
            translucent
          />
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />

              <HeaderTitle>Editar Perfil</HeaderTitle>

              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo
                source={{
                  uri: "https://avatars.githubusercontent.com/u/82681415?v=4",
                }}
              />

              <PhotoButton onPress={() => {}}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionChange("dataEdit")}
                activeOpacity={1}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>

              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}
                activeOpacity={1}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar Senha
                </OptionTitle>
              </Option>
            </Options>

            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                />
              </Section>
            ) : (
              <Section>
                <InputPassword iconName="lock" placeholder="Senha atual" />
                <InputPassword iconName="lock" placeholder="Nova senha" />
                <InputPassword iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}
          </Content>
        </Container>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
