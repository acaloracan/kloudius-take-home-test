import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  HelperText,
  TextInput as PaperTextInput,
  TextInputProps,
} from 'react-native-paper';

export type GenericTextInputProps = TextInputProps & {
  errorMessage?: string;
};

export const TextInput: React.FC<GenericTextInputProps> = ({
  errorMessage = '',
  error,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <PaperTextInput
        error={error}
        mode="outlined"
        {...props}
        style={styles.input}
      />

      <HelperText type="error" visible={error}>
        {errorMessage}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    marginBottom: 12,
  },
});
