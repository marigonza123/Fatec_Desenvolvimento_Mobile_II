import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/pages/Home';
import UserDataPage from './src/pages/UserData';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: "Abertura da conta", headerTitleAlign: "center", cardStyle: { backgroundColor: "#fff" } }} component={HomePage} />
        <Stack.Screen name="UserData" options={{ title: "Dados Informados", headerTitleAlign: "center", cardStyle: { backgroundColor: "#fff" } }} component={UserDataPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App