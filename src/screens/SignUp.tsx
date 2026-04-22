import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { PasswordInput, TextInput } from '../components';
import { useAuth } from '../context/AuthContext';
import { MainStackNavigationProp } from '../navigation/MainNavigation';
import { RouteNames } from '../navigation/routes';

type SignUpFormData = {
  email: string;
  password: string;
  name: string;
};

export const SignUp = () => {
  const navigation = useNavigation<MainStackNavigationProp>();

  const { signup } = useAuth();

  const { control, handleSubmit, setError } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  function onSignUpPress() {
    handleSubmit(async data => {
      Keyboard.dismiss();
      const result = await signup({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      if (result.status) {
        navigation.reset({
          index: 0,
          routes: [{ name: RouteNames.Home }],
        });
      } else {
        setError('email', {
          type: 'manual',
          message: result.error || 'Unknown error',
        });
      }
    })();
  }

  function onLoginPress() {
    navigation.goBack();
  }

  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text variant="headlineMedium" style={styles.title}>
            Sign Up
          </Text>
          <Divider style={styles.divider} />
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                message: 'Name is required',
                value: true,
              },
            }}
            render={({ field, formState }) => (
              <TextInput
                mode="outlined"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                label="Name"
                placeholder="Name"
                error={formState.errors.name !== undefined}
                errorMessage={formState.errors.name?.message}
              />
            )}
          />
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
                mode="outlined"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                label="Email"
                placeholder="Email"
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
                mode="outlined"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                label="Password"
                placeholder="Password"
                error={formState.errors.password !== undefined}
                errorMessage={formState.errors.password?.message}
              />
            )}
          />
          <Button
            mode="contained"
            onPress={onSignUpPress}
            style={styles.signupBtn}
          >
            Sign Up
          </Button>
          <Button mode="text" onPress={onLoginPress} style={styles.loginBtn}>
            Go to Login
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
  signupBtn: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 6,
  },
  loginBtn: {
    marginTop: 8,
    alignSelf: 'center',
  },
});
