import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size={48} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    color: '#555',
  },
});

export default Loading;
