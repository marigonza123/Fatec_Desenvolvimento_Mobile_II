import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ResultLine = ({
    title,
    children
}) => {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingBottom: 10,
        }}>
            <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                paddingRight: 5
            }}>
                {title}
            </Text>
            {children}
        </View>
    )
}

const UserDataPage = ({
    route: {
        params: {
            name: nameResult,
            age: ageResult,
            sex: sexResult,
            schooling: schoolingResult,
            creditLimit: creditLimitResult,
            isBrazilian: isBrazilianResult,
        }
    }
}) => {
    return (
        <View style={{
            flexDirection: "column",
            paddingLeft: 40
        }}>
            <ResultLine title={"Nome:"}  >
                <Text style={{ color: "#000", fontSize: 15 }}>{nameResult}</Text>
            </ResultLine>
            <ResultLine title={"Idade:"}  >
                <Text style={{ color: "#000", fontSize: 15 }}>{ageResult}</Text>
            </ResultLine>
            <ResultLine title={"Sexo:"}  >
                <Text style={{ color: "#000", fontSize: 15 }}>{sexResult}</Text>
            </ResultLine>
            <ResultLine title={"Escolaridade:"}  >
                <Text style={{ color: "#000", fontSize: 15 }}>{schoolingResult}</Text>
            </ResultLine>
            <ResultLine title={"Limit:"}  >
                <Text style={{ color: "#000", fontSize: 15 }}>{creditLimitResult}</Text>
            </ResultLine>
            <ResultLine title={"Brasileiro:"}  >
                <Text style={{ color: "#000", fontSize: 15 }}>{isBrazilianResult}</Text>
            </ResultLine>
        </View>
    )
}

export default UserDataPage

const styles = StyleSheet.create({})