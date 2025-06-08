import { useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
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
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "@api/upload-file";
import { signUp } from "@api/sign-up";
import { showToast } from "@utils/toast";
import { useAuth } from "@hooks/useAuth";

const signUpForm = z
  .object({
    name: z.string({ message: "Nome é obrigatório" }),
    email: z
      .string({
        message: "E-mail é obrigatório",
      })
      .email({
        message: "E-mail Inválido",
      }),
    password: z.string({ message: "Senha é obrigatória" }),
    passwordConfirmation: z.string({
      message: "Confirmação de senha é obrigatória",
    }),
    phone: z.string({ message: "Telefone é obrigatório" }),
    file: z.object(
      {
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      },
      { message: "Imagem é obrigatória" }
    ),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      message: "Senhas não são iguais",
      path: ["passwordConfirmation"],
    }
  );

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const { singInSeller } = useAuth();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp(data: SignUpForm) {
    try {
      setIsLoading(true);

      const { attachments } = await uploadFile(data.file);

      const avatarId = attachments?.[0]?.id;

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        phone: data.phone,
        avatarId,
      };

      await signUp(payload);
      await singInSeller(payload.email, payload.password);

      showToast("success", "Cadastro realizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      showToast(
        "error",
        "Não foi possível realizar o cadastro.",
        "Tente novamente mais tarde."
      );
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

            <Title>Crie sua conta</Title>
            <Subtitle>Informe os seus dados pessoais e de acesso</Subtitle>

            <Fieldset legend="Perfil">
              <Controller
                control={control}
                name="file"
                render={({ field: { onChange, value } }) => (
                  <FileInput
                    defaultValue={value?.uri}
                    onChangeImage={(uri) =>
                      onChange({ uri, name: "profile.jpg", type: "image/jpeg" })
                    }
                    error={errors.file?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange } }) => (
                  <Input
                    label="Nome"
                    placeholder="Seu nome completo"
                    LeftIcon={User}
                    onChangeText={onChange}
                    error={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange } }) => (
                  <Input
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    keyboardType="phone-pad"
                    LeftIcon={Phone}
                    onChangeText={onChange}
                    error={errors.phone?.message}
                  />
                )}
              />
            </Fieldset>

            <Fieldset legend="Acesso">
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

              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { onChange } }) => (
                  <PasswordInput
                    label="Confirmação de senha"
                    placeholder="Confirme sua senha"
                    LeftIcon={Lock}
                    onChangeText={onChange}
                    error={errors.passwordConfirmation?.message}
                  />
                )}
              />
            </Fieldset>

            <Button
              title="Acessar"
              RightIcon={ArrowRight}
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
            />
          </Content>

          <Footer>
            <FooterText>Ainda não tem uma conta?</FooterText>
            <Button
              title="Acessar"
              variant="outline"
              RightIcon={ArrowRight}
              onPress={handleGoBack}
            />
          </Footer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
