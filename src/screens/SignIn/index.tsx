import { ArrowRight, Lock, Mail } from "lucide-react-native";
import {
  Container,
  Content,
  Footer,
  FooterText,
  Logo,
  Subtitle,
  Title,
} from "./styles";

import LogoMarketplace from "@assets/logo.png";

import { Input } from "@components/Input";
import { PasswordInput } from "@components/PasswordInput";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <Container>
      <Content>
        <Logo source={LogoMarketplace} />

        <Title>Acesse sua Conta</Title>
        <Subtitle>Informe seu e-mail e senha para entrar</Subtitle>

        <Input
          label="E-mail"
          placeholder="mail@exemplo.br"
          keyboardType="email-address"
          LeftIcon={Mail}
        />

        <PasswordInput
          label="Senha"
          placeholder="Sua senha de acesso"
          LeftIcon={Lock}
        />

        <Button title="Acessar" RightIcon={ArrowRight} />
      </Content>

      <Footer>
        <FooterText>Ainda não tem uma conta?</FooterText>
        <Button title="Cadastrar" variant="outline" RightIcon={ArrowRight} />
      </Footer>
    </Container>
  );
}
