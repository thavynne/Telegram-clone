import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppearanceScreen(){
    const [darkMode,setDarkMode]=useState(true);

    return(
    <SafeAreaView style={[
    styles.container,
    {backgroundColor: darkMode ? "#0f172a" : "#f1f5f9"}
    ]}>
        <Text style={[styles.title,{color: darkMode ? "#fff" : "#000"}]}>Tema</Text>
        <TouchableOpacity style={styles.button} onPress={()=>setDarkMode(!darkMode)}>
            <Text style={styles.buttonText}>{darkMode ? "Mudar para claro" : "Mudar para escuro"}</Text>
        </TouchableOpacity>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:22,
        marginBottom:20
    },
    button:{
        backgroundColor:"#6366f1",
        padding:15,
        borderRadius:10
    },
    buttonText:{
        color:"#fff"
    }
});