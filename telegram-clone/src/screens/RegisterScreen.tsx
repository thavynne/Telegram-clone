import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { register } from '../services/authService';
import * as ImagePicker from 'expo-image-picker';

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha email e senha.");
            return;
        }

        try {
            await register(email, password, avatar || "");
            Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
                { text: "OK", onPress: () => navigation.navigate("Login") }
            ]);
        } catch (error: any) {
            Alert.alert("Erro ao registrar", error.message || "Tente novamente mais tarde.");
            console.error(error);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
            <View style={styles.container}>
                {/* Avatar no topo */}
                <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={styles.avatarPreview} />
                    ) : (
                        <Text style={styles.avatarText}>Selecionar foto</Text>
                    )}
                </TouchableOpacity>

                {/* Inputs */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#94a3b8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {/* Botão registrar */}
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>

                {/* Link para login */}
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.linkText}>Já tem uma conta? Fazer login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 250,
        backgroundColor: "#0f172a",
    },
    avatarButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#3b82f6",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        backgroundColor: "#1e293b",
        overflow: "hidden",
    },
    avatarPreview: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    avatarText: {
        color: "#94a3b8",
        textAlign: "center",
    },
    input: {
        width: "100%",
        backgroundColor: "#1e293b",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        color: "#fff",
        marginBottom: 20,
    },
    button: {
        width: "100%",
        backgroundColor: "#3b82f6",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
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
        marginTop: 15,
    },
});