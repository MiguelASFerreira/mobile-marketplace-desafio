import { useMemo, useState } from "react";
import { LogOut, Lock, Mail, Phone, User } from "lucide-react-native";
import { KeyboardAvoidingView, ScrollView } from "react-native";

import { Container, Content, ProfileHeader, LogoutButton } from "./styles";

import { Input } from "@components/Input";
import { PasswordInput } from "@components/PasswordInput";
import { Button } from "@components/Button";
import { Fieldset } from "@components/Fieldset";
import { FileInput } from "@components/FileInput";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@utils/toast";
import { uploadFile } from "@api/upload-file";
import { edtiProfile } from "@api/edit-profile";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

const profileForm = z
  .object({
    name: z.string().optional(),
    email: z.string().email({ message: "E-mail Inválido" }).optional(),
    password: z.string().nullable().optional(),
    newPassword: z.string().nullable().optional(),
    phone: z.string(),
    file: z
      .object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (!!data.newPassword && !data.password) return false;
      return true;
    },
    {
      message: "Informe a senha atual para definir uma nova senha",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.password && data.newPassword) {
        return data.password !== data.newPassword;
      }
      return true;
    },
    {
      message: "A nova senha deve ser diferente da atual",
      path: ["newPassword"],
    }
  );

type ProfileForm = z.infer<typeof profileForm>;

export function Profile() {
  const { seller, updateSellerProfile, signOutSeller } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileForm),
    mode: "onChange",
    defaultValues: {
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
    },
  });

  function handleLogout() {
    signOutSeller();
  }

  async function updateProfile(data: ProfileForm) {
    try {
      setIsLoading(true);

      const sellerUpdated = { ...seller };
      let avatarId: string | undefined;

      if (data.file) {
        const { attachments } = await uploadFile(data.file);
        avatarId = attachments?.[0]?.id || undefined;

        if (attachments?.[0]) {
          sellerUpdated.avatar = attachments[0];
        }
      }

      const payload = {
        name: data.name ?? seller.name,
        email: data.email ?? seller.email,
        phone: data.phone ?? seller.phone,
        ...(data.password && { password: data.password }),
        ...(data.newPassword && { newPassword: data.newPassword }),
        ...(avatarId && { avatarId }),
      };

      sellerUpdated.name = data.name!;
      sellerUpdated.phone = data.phone;

      await edtiProfile(payload);
      await updateSellerProfile(sellerUpdated);

      showToast("success", "Perfil atualizado com sucesso!");
      navigation.reset({
        index: 0,
        routes: [{ name: "profile" }],
      });
    } catch (error: any) {
      showToast("error", "Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  }

  const avatarUrl = useMemo(() => {
    const image = seller?.avatar?.url?.split("/attachments/")[1];
    return image
      ? `${process.env.EXPO_PUBLIC_API_URL}/attachments/${image}`
      : undefined;
  }, [seller]);

  return (
    <KeyboardAvoidingView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Content>
            <ProfileHeader>
              <Controller
                control={control}
                name="file"
                render={({ field: { onChange } }) => (
                  <FileInput
                    defaultValue={avatarUrl ? avatarUrl : undefined}
                    onChangeImage={(uri) =>
                      onChange({ uri, name: "profile.jpg", type: "image/jpeg" })
                    }
                  />
                )}
              />
              <LogoutButton onPress={handleLogout}>
                <LogOut size={24} color="#ED4D1B" />
              </LogoutButton>
            </ProfileHeader>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  placeholder="Seu nome completo"
                  LeftIcon={User}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  keyboardType="phone-pad"
                  LeftIcon={Phone}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Fieldset legend="Acesso">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="E-mail"
                    placeholder="mail@exemplo.br"
                    keyboardType="email-address"
                    LeftIcon={Mail}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange } }) => (
                  <PasswordInput
                    label="Senha Atual"
                    placeholder="Senha atual"
                    LeftIcon={Lock}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange } }) => (
                  <PasswordInput
                    label="Nova senha"
                    placeholder="Nova senha"
                    LeftIcon={Lock}
                    onChangeText={onChange}
                    error={errors.newPassword?.message}
                  />
                )}
              />
            </Fieldset>

            <Button
              title="Atualizar cadastro"
              isLoading={isLoading}
              onPress={handleSubmit(updateProfile)}
            />
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
