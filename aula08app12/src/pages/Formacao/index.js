import { Text, useColorScheme, } from 'react-native'
import React from 'react'
import Section from '../../components/Section'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Formacao = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Section title="Formacao">
            <Text style={[{
                color: isDarkMode ? Colors.light : Colors.dark, fontSize: 18,
                fontWeight: '400',
            },]}>
                Sistema para Internet - Fatec Baixada Santista
            </Text>
        </Section>
    )
}

export default Formacao