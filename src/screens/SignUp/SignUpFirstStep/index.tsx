import React, { useEffect, useRef, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Yup from "yup";

import { RootStackParamList } from "../../../routes/stack.routes";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
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

type SignUpFirstStepScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUpFirstStep"
>;

export function SignUpFirstStep() {
  const navigation = useNavigation<SignUpFirstStepScreenProp>();
  const scrollViewRef = useRef<ScrollView>({} as ScrollView);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),

        email: Yup.string()
          .required("E-mail é obrigatório")
          .email("E-mail inválido"),
        name: Yup.string().required("Nome é obrigatório"),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Atenção", error.message);
      } else {
        Alert.alert(
          "Ops!",
          "Ocorreu um erro ao fazer login, verifique suas credenciais"
        );
      }
    }
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
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>

          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
