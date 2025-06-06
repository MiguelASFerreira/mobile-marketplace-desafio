import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
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
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import LogoMarketplace from "@assets/logo.png";

import { Input } from "@components/Input";
import { PasswordInput } from "@components/PasswordInput";
import { Button } from "@components/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { api } from "@lib/api";
import { signIn } from "@api/sign-in";
import { useMutation } from "@tanstack/react-query";

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const navigation = useNavigation<AuthNavigationRoutesProps>();
  const { control, handleSubmit } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: signIn,
  });

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: SignInForm) {
    try {
      await authenticate({ email, password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container>
        <Content>
          <Logo source={LogoMarketplace} />

          <Title>Acesse sua Conta</Title>
          <Subtitle>Informe seu e-mail e senha para entrar</Subtitle>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                label="E-mail"
                placeholder="mail@exemplo.br"
                keyboardType="email-address"
                LeftIcon={Mail}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <PasswordInput
                label="Senha"
                placeholder="Sua senha de acesso"
                LeftIcon={Lock}
                onChangeText={onChange}
              />
            )}
          />

          <Button
            title="Acessar"
            RightIcon={ArrowRight}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isPending}
          />
        </Content>

        <Footer>
          <FooterText>Ainda não tem uma conta?</FooterText>
          <Button
            title="Cadastrar"
            variant="outline"
            RightIcon={ArrowRight}
            onPress={handleNewAccount}
          />
        </Footer>
      </Container>
    </ScrollView>
  );
}
