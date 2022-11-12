
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './src/pages/Home';
import ExperienciaPage from './src/pages/Experiencia';
import FormacaoPage from './src/pages/Formacao';
import PessoalPage from './src/pages/Pessoal';
const Drawer = createDrawerNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Experiencia"
                defaultScreenOptions={{
                    swipeEnabled: true,
                    headerTitleAlign: "center",
                    cardStyle: {
                        backgroundColor: "#fff"
                    }
                }}
            >
                <Drawer.Screen
                    name="Home"
                    options={{ title: "Abertura da conta", }}
                    component={HomePage} />
                <Drawer.Screen

                    name="Experiencia"
                    options={{ title: "Experiencia", }}
                    component={ExperienciaPage}
                />
                <Drawer.Screen
                    name="Formacao"
                    options={{ title: "Formacao", }}
                    component={FormacaoPage}
                />
                <Drawer.Screen
                    name="Pessoal"
                    options={{ title: "Pessoal", }}
                    component={PessoalPage}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default App