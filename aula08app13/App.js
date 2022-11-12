
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/pages/Home';
import ExperienciaPage from './src/pages/Experiencia';
import FormacaoPage from './src/pages/Formacao';
import PessoalPage from './src/pages/Pessoal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Experiencia"
                defaultScreenOptions={{
                    headerShown: false,
                    headerTitleAlign: "center",
                    cardStyle: {
                        backgroundColor: "#fff"
                    }
                }}
            >
                <Tab.Screen
                    name="Home"
                    options={{ title: "Home", }}
                    component={HomePage} />
                <Tab.Screen

                    name="Experiencia"
                    options={{ title: "Experiencia", }}
                    component={ExperienciaPage}
                />
                <Tab.Screen
                    name="Formacao"
                    options={{ title: "Formacao", }}
                    component={FormacaoPage}
                />
                <Tab.Screen
                    name="Pessoal"
                    options={{ title: "Pessoal", }}
                    component={PessoalPage}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App