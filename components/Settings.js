import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseconfig';
import { signOut,sendPasswordResetEmail } from 'firebase/auth';

const Settings = ({ navigation }) => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login'); // Navega a la pantalla de login después de cerrar sesión
      Alert.alert('Nos vemos pronto')
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      Alert.alert('Exito', 'Correo de restablecimiento de contraseña enviado');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del usuario</Text>
        <Text style={styles.userInfo}>Correo: {user ? user.email : 'Usuario'}</Text>
        <Button title="Cambiar contraseña" onPress={handlePasswordReset} color="#1E90FF" />
        <Button title="Cerrar sesión" onPress={handleLogout} color="#1E90FF" />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos de la versión</Text>
        <Text style={styles.cardSUb}>Versión de la aplicación: 1.0.0</Text>
        <Text style={styles.cardSUb}>Creado el 10 de julio de 2024</Text>
      </View>
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
  card: {
    width: '80%',
    padding: 16,
    backgroundColor: '#0288d1',
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  cardSUb: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Settings;

