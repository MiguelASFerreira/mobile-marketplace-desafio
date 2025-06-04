import { useNavigation } from "@react-navigation/native";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react-native";
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
import { Fieldset } from "@components/Fieldset";
import { FileInput } from "@components/FileInput";
import { ScrollView } from "react-native";

export function SignUp() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <Container>
        <Content>
          <Logo source={LogoMarketplace} />

          <Title>Crie sua conta</Title>
          <Subtitle>Informe os seus dados pessoais e de acesso</Subtitle>

          <Fieldset legend="Perfil">
            <FileInput />

            <Input
              label="Nome"
              placeholder="Seu nome completo"
              LeftIcon={User}
            />

            <Input
              label="Telefone"
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              LeftIcon={Phone}
            />
          </Fieldset>

          <Fieldset legend="Acesso">
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

            <PasswordInput
              label="Senha"
              placeholder="Sua senha de acesso"
              LeftIcon={Lock}
            />
          </Fieldset>

          <Button title="Acessar" RightIcon={ArrowRight} />
        </Content>

        <Footer>
          <FooterText>Ainda não tem uma conta?</FooterText>
          <Button title="Acessar" variant="outline" RightIcon={ArrowRight} onPress={handleGoBack} />
        </Footer>
      </Container>
    </ScrollView>
  );
}
