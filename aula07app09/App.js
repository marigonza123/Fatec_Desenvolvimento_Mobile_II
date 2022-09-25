import React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from 'react-native';
const { width } = Dimensions.get("window")

const InfoLine = ({
  title,
  value
}) => {
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      maxWidth: width - 150
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: "bold",
        paddingRight: 5
      }}>
        {title}
      </Text>
      <Text style={{
        fontSize: 16,
        paddingRight: 5
      }}>
        {value}
      </Text>
    </View>
  )
}
const AdElement = ({
  title,
  description,
  salary,
  contact,
}) => (
  <View style={[styles.adStyle, { justifyContent: "flex-start", }]}>
    <View>
    </View>
    <Text style={{ color: "#3268A9", fontSize: 17 }} numberOfLines={9}>
      {title}
    </Text>
    <InfoLine
      title={"Salário:"}
      value={salary}
    />
    <InfoLine
      title={"Descrição:"}
      value={description}
    />
    <InfoLine
      title={"Contato:"}
      value={contact}
    />
  </View>)
const options = ["Desenvolvedor Backend", "Engenheiro de dados"]
const data = new Array(10).fill({
  title: undefined,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  salary: 3000,
  contact: "123@abc.com"
}).map((value, index) => ({
  ...value,
  title: options[index % 2]
}))
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
          color: "#f00",
          paddingVertical: 20
        }}>
          Vagas
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={[{ flex: 1, width }]}
          keyExtractor={(item, index) => index}
          renderItem={
            ({ item: { title, description, salary, contact }, index }) =>
              <AdElement key={index}
                title={title}
                description={description}
                salary={salary}
                contact={contact}
              />
          }
          data={data}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  adStyle: {
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 13,
    borderColor: "#000",
    borderWidth: 2,
    justifyContent: "center"
  },
});

export default App;
