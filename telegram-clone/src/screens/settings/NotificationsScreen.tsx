import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function NotificationsScreen(){
    
    return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>
            Configurações de notificações
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

    text:{
        color:"#fff",
        fontSize:18
    }
});