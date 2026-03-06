import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../services/firebase";
import { logout } from "../services/authService";

export default function ProfileScreen() {

    const user = auth.currentUser;

    const handleLogout = async () => {
        await logout();
    };

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Perfil</Text>

            <Text style={styles.info}>Email:</Text>
            <Text style={styles.value}>{user?.email}</Text>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>Sair da Conta</Text>
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a"
    },

    title: {
        fontSize: 28,
        color: "#fff",
        marginBottom: 30
    },

    info: {
        color: "#94a3b8",
        fontSize: 16
    },

    value: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 40
    },

    logoutButton: {
        backgroundColor: "#ef4444",
        padding: 15,
        borderRadius: 10,
        width: "60%",
        alignItems: "center"
    },

    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }

});