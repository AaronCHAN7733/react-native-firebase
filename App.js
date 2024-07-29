
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddUser from './components/AddUser';
import UserManagement from './components/UserManagement';
import LockHistory from './components/LockHistory';
import LockScreen from './components/LockScreen'
import Settings from './components/Settings';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig';

const Stack = createStackNavigator();


const App = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Strong-Box" : "Login"}>
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen  options={{headerShown: false}} name="Strong-Box" component={Home} />
        <Stack.Screen name="Configuraciones" component={Settings} />
        <Stack.Screen name="Nuevo Usuario" component={AddUser} />
        <Stack.Screen name="Usuarios" component={UserManagement} />
        <Stack.Screen name="Cerradura" component={LockScreen} />
        <Stack.Screen name="Historial" component={LockHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;