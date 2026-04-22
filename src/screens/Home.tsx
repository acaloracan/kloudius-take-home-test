import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { user, logout } = useAuth();

  function onLogoutPress() {
    logout();
  }

  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Text
            size={72}
            label={user?.name ? user.name[0].toUpperCase() : '?'}
            style={styles.avatar}
          />
          <Text variant="titleLarge" style={styles.welcome}>
            Welcome{user?.name ? `, ${user.name}` : ''}!
          </Text>
          <Divider style={styles.divider} />
          <Text variant="bodyMedium" style={styles.emailLabel}>
            Email
          </Text>
          <Text variant="bodyLarge" style={styles.email}>
            {user?.email}
          </Text>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={onLogoutPress} style={styles.logoutBtn}>
        Logout
      </Button>
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
    marginBottom: 32,
    backgroundColor: 'white',
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: '#1976d2',
  },
  welcome: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  divider: {
    width: '60%',
    marginVertical: 12,
    alignSelf: 'center',
  },
  emailLabel: {
    color: '#888',
    marginBottom: 2,
  },
  email: {
    marginBottom: 8,
    fontWeight: '600',
  },
  logoutBtn: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    paddingVertical: 6,
    alignSelf: 'center',
  },
});
