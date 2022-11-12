import { Text, useColorScheme, } from 'react-native'
import React from 'react'
import Section from '../../components/Section'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Pessoal = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Section title="Dados Pessoais">
            <Text style={[{
                color: isDarkMode ? Colors.light : Colors.dark, marginTop: 8,
                fontSize: 18,
                fontWeight: '400',
            },]}>
                Marina Gonzalez Lopes
            </Text>
        </Section>
    )
}

export default Pessoal