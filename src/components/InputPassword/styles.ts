import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  margin-bottom: ${RFValue(8)}px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: ${RFValue(2)}px;
      border-color: ${theme.colors.main};
    `}
`;

export const IconContainer = styled.View`
  width: ${RFValue(55)}px;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled(TextInput)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 0 0 ${RFValue(23)}px;
  margin-left: ${RFValue(2)}px;
`;
