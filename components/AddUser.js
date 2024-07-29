import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert,Text } from 'react-native';
import { db } from '../firebaseconfig';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

const AddUser = ({ route, navigation }) => {
  const { user, fetchUsers } = route.params || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveUser = async () => {
    if (name && email) {
      try {
        if (user) {
          // Update existing user
          const userDoc = doc(db, 'users', user.id);
          await updateDoc(userDoc, { name, email });
        } else {
          // Add new user
          await addDoc(collection(db, 'users'), { name, email });
        }
        setName('');
        setEmail('');
        fetchUsers();
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Usuario</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button
        title={user ? "Actualizar Usuario" : "Agregar Usuario"}
        onPress={handleSaveUser}
        color="#1E90FF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#1E90FF',
  },
  input: {
    height: 40,
    borderColor: '#1E90FF',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
  },
});

export default AddUser;




