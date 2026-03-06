import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function LoginScreen({ navigation }: {
    navigation: any
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#0f172a",
    },
    input: {
        backgroundColor: "#1e293b",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        color: "#fff",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#3b82f6",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    linkText: {
        color: "#94a3b8",
        textAlign: "center",
        fontSize: 15,
    },
});