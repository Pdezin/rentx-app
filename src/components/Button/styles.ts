import { PropsWithChildren } from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../styles/theme";

interface ButtonProps extends PropsWithChildren<RectButtonProps> {
  color: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
