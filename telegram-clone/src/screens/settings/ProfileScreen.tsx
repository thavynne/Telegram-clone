import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../services/firebase";

export default function ProfileScreen() {
    const user = auth.currentUser;
    
    return (
    <SafeAreaView style={styles.container}>
        <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
            style={styles.avatar}
        />
        <Text style={styles.name}>
            {user?.email}  
        </Text>
        <Text style={styles.info}>
            Conta do usuário
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

    avatar:{
        width:120,
        height:120,
        borderRadius:60,
        marginBottom:20
    },
    
    name:{
        color:"#fff",
        fontSize:20,
        fontWeight:"bold"
    },

    info:{
        color:"#94a3b8",
        marginTop:5
    }

});