import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function SecurityScreen(){
    const [currentPassword,setCurrentPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const handleChangePassword = async () => {
        try{
            const user = auth.currentUser;
            if(!user || !user.email) return;
            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );
            await reauthenticateWithCredential(user,credential);
            await updatePassword(user,newPassword);
            alert("Senha alterada!");
        }catch(error){
            console.log(error);
            alert("Erro ao alterar a senha");
        }
    };
    
    return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Alterar senha</Text>
        <TextInput
            style={styles.input}
            placeholder="Senha atual"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
        />

        <TextInput
            style={styles.input}
            placeholder="Nova senha"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
        >
            <Text style={styles.buttonText}>
                Alterar senha
            </Text>
        </TouchableOpacity>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#0f172a",
        padding:20
    },

    title:{
        color:"#fff",
        fontSize:22,
        marginBottom:20
    },

    input:{
        backgroundColor:"#1e293b",
        padding:15,
        borderRadius:10,
        marginBottom:15,
        color:"#fff",
        borderWidth:1,
        borderColor:"#334155",
    },

    button:{
        backgroundColor:"#3b82f6",
        padding:15,
        borderRadius:10,
        alignItems:"center"
    },

    buttonText:{
        color:"#fff",
        fontWeight:"bold"
    }

});