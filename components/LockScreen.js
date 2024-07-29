import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import { db, auth, rtdb } from '../firebaseconfig'; // Importa rtdb

const LockScreen = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = async () => {
    const newUnlockState = !isUnlocked;
    setIsUnlocked(newUnlockState);

    if (newUnlockState) {
      try {
        // Actualiza Firestore
        const unlockEvent = {
          user: auth.currentUser ? auth.currentUser.email : 'Unknown',
          timestamp: serverTimestamp(),
          unlocked: newUnlockState
        };
        const docRef = doc(db, 'unlockHistory', `${Date.now()}`);
        await setDoc(docRef, unlockEvent);
        console.log('Evento de desbloqueo registrado en Firestore:', unlockEvent);

        // Actualiza Realtime Database
        const dbRef = ref(rtdb, 'lockState');
        await set(dbRef, {
          unlocked: newUnlockState,
          user: auth.currentUser ? auth.currentUser.email : 'Unknown',
          timestamp: Date.now()
        });
        console.log('Estado de la cerradura actualizado en Realtime Database');
      } catch (error) {
        console.error('Error al registrar el evento de desbloqueo:', error);
      }

      // Cambia el estado de desbloqueo después de 5 segundos
      setTimeout(async () => {
        setIsUnlocked(false);

        // Actualiza Realtime Database a bloqueado
        const dbRef = ref(rtdb, 'lockState');
        await set(dbRef, {
          unlocked: false,
          user: auth.currentUser ? auth.currentUser.email : 'Unknown',
          timestamp: Date.now()
        });
        console.log('Estado de la cerradura actualizado a bloqueado en Realtime Database');
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrir Cerradura</Text>
      <TouchableOpacity
        style={[styles.button, isUnlocked && styles.buttonOpen]}
        onPress={handleUnlock}
      >
        <Text style={styles.buttonText}>{isUnlocked ? 'Abierto' : 'Cerrado'}</Text>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: '#1E90FF',
  },
  button: {
    backgroundColor: '#87CEEB',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#1E90FF',
  },
  buttonText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LockScreen;










