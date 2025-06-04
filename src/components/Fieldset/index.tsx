import React from "react";
import { ViewProps } from "react-native";

import { Container, Legend } from "./styles";

interface FieldsetProps extends ViewProps {
  legend: string;
  children: React.ReactNode;
}

export function Fieldset({ legend, children, ...rest }: FieldsetProps) {
  return (
    <Container {...rest}>
      {legend && <Legend>{legend}</Legend>}
      {children}
    </Container>
  );
}
