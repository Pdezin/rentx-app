import React, { useEffect, useRef, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "styled-components";

import { RootStackParamList } from "../../../routes/stack.routes";
import { SignUpDTO } from "../../../dtos/SignUpDTO";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { InputPassword } from "../../../components/InputPassword";
import { Button } from "../../../components/Button";

import {
  Container,
  Header,
  Steps,
  ButtonWrapper,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";

type SignUpSecondStepScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUpSecondStep"
>;

interface Params {
  user: SignUpDTO;
}

export function SignUpSecondStep() {
  const theme = useTheme();
  const navigation = useNavigation<SignUpSecondStepScreenProp>();
  const route = useRoute();
  const scrollViewRef = useRef<ScrollView>({} as ScrollView);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Atenção", "Informe a senha e a confirmação");
    }

    if (password !== passwordConfirm) {
      return Alert.alert(
        "Atenção",
        "Senha digitada é diferente da de confirmação"
      );
    }

    navigation.navigate("Confirmation", {
      data: {
        title: "Conta criada!",
        message: "Agora é só fazer login\ne aproveitar",
        nextScreenRoute: "SignIn",
      },
    });
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
          <Header>
            <ButtonWrapper>
              <BackButton onPress={handleBack} />
            </ButtonWrapper>

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>

          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <InputPassword
              iconName="lock"
              placeholder="Repetir Senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
