import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { PasswordInput, TextInput } from '../components';
import { useAuth } from '../context/AuthContext';
import { MainStackNavigationProp } from '../navigation/MainNavigation';
import { RouteNames } from '../navigation/routes';

type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const { login } = useAuth();

  const navigation = useNavigation<MainStackNavigationProp>();

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  async function onLoginPress() {
    handleSubmit(async data => {
      Keyboard.dismiss();
      const result = await login({
        email: data.email,
        password: data.password,
      });
      if (!result.status) {
        Alert.alert('Login Failed', result.error || 'Unknown error');
        reset({ password: '', email: '' });
      }
    })();
  }

  function onSignUpPress() {
    navigation.navigate(RouteNames.SignUp);
  }

  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text variant="headlineMedium" style={styles.title}>
            Log In
          </Text>
          <Divider style={styles.divider} />
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email format',
              },
            }}
            render={({ field, formState }) => (
              <TextInput
                value={field.value}
                label="Email Address"
                placeholder="Email Address"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                error={formState.errors.email !== undefined}
                errorMessage={formState.errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field, formState }) => (
              <PasswordInput
                value={field.value}
                label="Password"
                placeholder="Password"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={formState.errors.password !== undefined}
                errorMessage={formState.errors.password?.message}
              />
            )}
          />
          <Button
            mode="contained"
            onPress={onLoginPress}
            style={styles.loginBtn}
          >
            Login
          </Button>
          <Button mode="text" onPress={onSignUpPress} style={styles.signupBtn}>
            Go to Sign Up
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: 'white',
  },
  cardContent: {
    paddingVertical: 32,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  divider: {
    marginBottom: 16,
    width: '60%',
    alignSelf: 'center',
  },
  loginBtn: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 6,
  },
  signupBtn: {
    marginTop: 8,
    alignSelf: 'center',
  },
});
