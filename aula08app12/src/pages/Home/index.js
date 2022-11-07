import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const Link = ({ children, url }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "column",
        flex: 1
      }}
      onPress={() => { Linking.openURL(url) }}
    >
      <Text style={{
        color: "#0000EE",
        fontSize: 15,
        textDecorationLine: "underline",
        marginTop: 10,
      }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const HomePage = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={{ paddingVertical: 30 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../../../image.jpeg")}
            style={{ width: 300, height: 300 }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "column", }}>
          <Section title="Dados Pessoais">
            <Text style={[styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark, },]}>
              Marina Gonzalez Lopes
            </Text>
          </Section>
          <Section title="Formação">
            <Text style={[styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark, },]}>
              Sistema para Internet - Fatec Baixada Santista
            </Text>
          </Section>
          <Section title="Experiencia">
            <Text style={[styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark, },]}>
              UX/UI Designer - 3 anos
            </Text>
          </Section>
          <Section title="Projetos">
            <Link url="https://www.behance.net/gallery/135187361/Pinacotapp-UXUI-Mobile">Pinacotapp</Link>
            <Link url="https://www.behance.net/gallery/136155539/RAGE-QUIT-UXUI-Designer">RAGE-QUIT</Link>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomePage;
