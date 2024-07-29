import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseconfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const UserManagement = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, 'users');

  const fetchUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    navigation.navigate('Nuevo Usuario', { user, fetchUsers });
  };

  const handleDeleteUser = async (id) => {
    Alert.alert(
      'Eliminar Usuario',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: async () => {
            try {
              const userDoc = doc(db, 'users', id);
              await deleteDoc(userDoc);
              fetchUsers();
              Alert.alert('Usuario eliminado', 'El usuario ha sido eliminado con éxito.');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }, style: 'destructive'
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manejo de usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>{item.name} - {item.email}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Editar" onPress={() => handleEditUser(item)} color="#1E90FF" />
              <Button title="Eliminar" onPress={() => handleDeleteUser(item.id)} color="#FF0000" />
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Nuevo Usuario', { fetchUsers })}
      >
        <Text style={styles.addButtonText}>Agregar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#1E90FF',
  },
  userContainer: {
    padding: 16,
    backgroundColor: '#0288d1',
    marginVertical: 8,
    borderRadius: 8,
  },
  userText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UserManagement;




