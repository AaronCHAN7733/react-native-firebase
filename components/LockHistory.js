import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseconfig';

const LockHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'unlockHistory'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const unlockEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(unlockEvents);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Usuario: {item.user}</Text>
      <Text style={styles.cardText}>Hora: {item.timestamp?.toDate().toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Desbloqueos de la Cerradura</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No hay eventos de desbloqueo.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
    color: '#1E90FF',
  },
  card: {
    backgroundColor: '#0288d1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LockHistory;




