import { Text, useColorScheme, } from 'react-native'
import React from 'react'
import Section from '../../components/Section'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Experiencia = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Section title="Experiencia">
            <Text style={[{
                color: isDarkMode ? Colors.light : Colors.dark, fontSize: 18,
                fontWeight: '400',
            },]}>
                UX/UI Designer - 3 anos
            </Text>
        </Section>
    )
}

export default Experiencia