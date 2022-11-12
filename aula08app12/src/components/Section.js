import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={{
            marginTop: 32,
            paddingHorizontal: 24,
        }}>
            <Text
                style={[
                    {
                        fontSize: 24,
                        fontWeight: '600',
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            {children}
        </View>
    );
};

export default Section