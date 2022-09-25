import React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,

  View,
} from 'react-native';

const AdElement = ({ text }) => (<View style={[styles.adStyle, { justifyContent: "flex-start", }]}>
  <View
    style={{
      paddingBottom: 10

    }}>
    <Image source={require("./anuncio.png")}
      style={{
        height: 100,
        width: 100,
      }}
    />
  </View>
  <Text style={{ maxWidth: 100, }} numberOfLines={9}>
    {text}
  </Text>
</View>)
const data = new Array(10).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
const App = () => {

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"#fff"}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          paddingVertical: 20
        }}>
          Anuncios
        </Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20 }}
          style={[styles.list]}
          keyExtractor={(item, index) => index}
          renderItem={
            ({ item: text, index }) =>
              <AdElement key={index} text={text} />
          }
          data={data}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  adStyle: {
    marginRight: 12,
    padding: 13,
    borderColor: "#000",
    borderWidth: 2,
    maxWidth: 300,
    maxHeight: 300,
    justifyContent: "center"
  },
});

export default App;
