import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Configuraciones')}>
        <Ionicons name="settings-outline" size={30} color="#1E90FF" />
      </TouchableOpacity>
      <Text style={styles.welcomeText}>
        Strong-Box
      </Text>
      <Image
        source={require('../assets/logo2.png')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Usuarios')}>
        <Text style={styles.cardText}>Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Cerradura')}>
        <Text style={styles.cardText}>Abrir cerradura</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Historial')}>
        <Text style={styles.cardText}>Historial</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  settingsButton: {
    position: 'absolute',
    marginTop: 30,
    top: 40,
    right: 20,
  },
  card: {
    width: '80%',
    padding: 16,
    backgroundColor: '#0288d1',
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E90FF',
  },
});

export default Home;


