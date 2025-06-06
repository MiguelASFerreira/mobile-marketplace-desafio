// src/utils/toast.ts
import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error';

export function showToast(type: ToastType, message: string, description?: string) {
  Toast.show({
    type,
    text1: message,
    text2: description,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
}
