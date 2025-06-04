import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AlertCircle } from 'lucide-react-native';

import {
  Container,
  ErrorContainer,
  ErrorText,
  LabelText,
  UploadArea,
  UploadIcon,
} from './styles';

export interface FileInputProps {
  label?: string;
  error?: string;
  defaultValue?: string;
  onChangeImage?: (uri: string) => void;
}

export function FileInput({
  label,
  error,
  defaultValue,
  onChangeImage,
}: FileInputProps) {
  const [imageUri, setImageUri] = useState<string | undefined>(defaultValue);

  async function handleSelectImage() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return alert('É necessário permitir o acesso à galeria.');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      onChangeImage?.(uri);
    }
  }

  return (
    <Container>
      <TouchableOpacity activeOpacity={0.7} onPress={handleSelectImage}>
        <UploadArea>
          {!imageUri && (
            <>
              <UploadIcon />
              {label && <LabelText>{label}</LabelText>}
            </>
          )}
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: '100%', height: '100%', borderRadius: 12 }}
              resizeMode="cover"
            />
          )}
        </UploadArea>
      </TouchableOpacity>

      {error && (
        <ErrorContainer>
          <AlertCircle size={16} color="#F75A68" />
          <ErrorText>{error}</ErrorText>
        </ErrorContainer>
      )}
    </Container>
  );
}
