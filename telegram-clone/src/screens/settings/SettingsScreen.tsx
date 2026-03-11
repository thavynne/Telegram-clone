import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { logout } from "../../services/authService";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({ navigation }: { navigation: any }) {
    const handleLogout = async () => {
        await logout();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Configurações</Text>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text style={styles.itemText}>👤 Perfil</Text>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate("Security")}
                >
                    <Text style={styles.itemText}>🔒 Segurança</Text>
                    <Text style={styles.arrow}>›</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate("Appearance")}
                >
                    <Text style={styles.itemText}>🎨 Aparência</Text>
                    <Text style={styles.arrow}>›</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate("Notifications")}
                >
                    <Text style={styles.itemText}>🔔 Notificações</Text>
                    <Text style={styles.arrow}>›</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate("About")}
                >
                    <Text style={styles.itemText}>ℹ️ Sobre</Text>
                    <Text style={styles.arrow}>›</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.logout}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Sair da conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#0f172a"
    },

    title: {
        fontSize: 26,
        color: "#fff",
        fontWeight: "bold",
        margin: 20
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1e293b",
        padding: 18,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 10
    },

    itemText: {
        color: "#fff",
        fontSize: 16
    },

    arrow: {
        color: "#94a3b8",
        fontSize: 22
    },

    logout: {
        marginTop: 30,
        backgroundColor: "#ef4444",
        marginHorizontal: 15,
        padding: 18,
        borderRadius: 10,
        alignItems: "center"
    },

    logoutText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },

    safeArea: {
        flex: 1,
        backgroundColor: "#0f172a"
    }

});