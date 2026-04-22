import React, { useState } from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { GenericTextInputProps, TextInput } from '../TextInput/TextInput';

export const PasswordInput: React.FC<GenericTextInputProps> = props => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <TextInput
      secureTextEntry={!showPassword}
      right={
        <PaperTextInput.Icon
          icon={showPassword ? 'eye-off' : 'eye'}
          onPress={() => setShowPassword(!showPassword)}
        />
      }
      {...props}
    />
  );
};
