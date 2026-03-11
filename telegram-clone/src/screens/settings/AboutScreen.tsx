import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function AboutScreen(){

    return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
            Sobre o aplicativo
        </Text>
        <Text style={styles.text}>
            Versão 1.0
        </Text>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#0f172a",
        alignItems:"center",
        justifyContent:"center"
    },

    title:{
        color:"#fff",
        fontSize:22,
        marginBottom:10
    },

    text:{
        color:"#94a3b8"
    }

});