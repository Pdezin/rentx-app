import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
}: Props) {
  const theme = useTheme();

  return (
    <Container
      onPress={onPress}
      color={color ? color : theme.colors.main}
      enabled={enabled && !loading}
      style={{ opacity: !enabled || loading ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator
          color={light ? theme.colors.header : theme.colors.shape}
        />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
