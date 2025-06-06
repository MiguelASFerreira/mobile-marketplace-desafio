import { LogOut, Lock, Mail, Phone, User } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";

import {
  Container,
  Content,
  ProfileHeader,
  LogoutButton
} from "./styles";

import { Input } from "@components/Input";
import { PasswordInput } from "@components/PasswordInput";
import { Button } from "@components/Button";
import { Fieldset } from "@components/Fieldset";
import { FileInput } from "@components/FileInput";
import { useNavigation } from "@react-navigation/native";

export function Profile() {
  const navigation = useNavigation();

  function handleLogout() {
    navigation.goBack()
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <Container>
        <Content>
          <ProfileHeader>
            <FileInput />
            <LogoutButton onPress={handleLogout}>
              <LogOut size={24} color="#ED4D1B" />
            </LogoutButton>
          </ProfileHeader>

          <Fieldset legend="Nome">
            <Input
              placeholder="Nome completo"
              value="Brandon Ekstrom"
              editable={false}
              LeftIcon={User}
            />
          </Fieldset>

          <Fieldset legend="Telefone">
            <Input
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              value="(55) 99999-9999"
              editable={false}
              LeftIcon={Phone}
            />
          </Fieldset>

          <Fieldset legend="Acesso">
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              value="brandon.ekstrom@example.com"
              editable={false}
              LeftIcon={Mail}
            />

            <PasswordInput
              label="Senha atual"
              placeholder="Sua senha"
              LeftIcon={Lock}
            />

            <PasswordInput
              label="Nova senha"
              placeholder="Sua nova senha"
              LeftIcon={Lock}
            />
          </Fieldset>

          <Button title="Atualizar cadastro" />
        </Content>
      </Container>
    </ScrollView>
  );
}
