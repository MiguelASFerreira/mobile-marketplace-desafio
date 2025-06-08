import { useState } from "react";
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
import { KeyboardAvoidingView, ScrollView } from "react-native";

import LogoMarketplace from "@assets/logo.png";

import { Input } from "@components/Input";
import { PasswordInput } from "@components/PasswordInput";
import { Button } from "@components/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { showToast } from "@utils/toast";
import { isAxiosError, type AxiosError } from "axios";
import { useAuth } from "@hooks/useAuth";

const signInForm = z.object({
  email: z
    .string({
      message: "E-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido",
    }),
  password: z.string({
    message: "Senha é obrigatória",
  }),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const { singInSeller } = useAuth();
  const navigation = useNavigation<AuthNavigationRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: SignInForm) {
    setIsLoading(true);
    try {
      await singInSeller(email, password);
      showToast("success", "Login realizado com sucesso!");
      setIsLoading(false);
    } catch (e: AxiosError | unknown) {
      if (isAxiosError(e)) {
        if (e.response?.status === 403) {
          showToast("error", "E-mail ou senha inválidos.");
          return;
        }
      }
      showToast(
        "error",
        "Não foi possível acessar sua conta.",
        "Tente novamente mais tarde."
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
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
                  error={errors.email?.message}
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
                  error={errors.password?.message}
                />
              )}
            />

            <Button
              title="Acessar"
              RightIcon={ArrowRight}
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
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
    </KeyboardAvoidingView>
  );
}
