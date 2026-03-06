import React, { useEffect, useState } from "react";
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet,
    ActivityIndicator, SafeAreaView, Alert
} from "react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import { logout } from "../services/authService";

export default function ChatListScreen({ navigation }: any) {
    const [users, setUsers] = useState<CometChat.User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersRequest = new CometChat.UsersRequestBuilder()
                .setLimit(30)
                .build();

            const userList = await usersRequest.fetchNext();
            setUsers(userList);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error: any) {
            Alert.alert("Erro ao sair", error.message ?? String(error));
        }
    };

    const renderItem = ({ item }: { item: CometChat.User }) => (
        <TouchableOpacity
            style={styles.userItem}
            onPress={() =>
                navigation.navigate("Chat", {
                    uid: item.getUid(),
                    name: item.getName(),
                })
            }
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {item.getName().charAt(0).toUpperCase()}
                </Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.getName()}</Text>
                <Text style={styles.userStatus}>
                    {item.getStatus() === "online" ? "🟢 Online" : "⚫ Offline"}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Conversas</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#2196F3" />
            ) : users.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>
                </View>
            ) : (
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={item => item.getUid()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2196F3",
        padding: 16,
        justifyContent: "space-between",
    },
    headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
    logoutBtn: { padding: 4 },
    logoutText: { color: "#fff", fontSize: 14 },
    loader: { flex: 1, justifyContent: "center" },
    emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    emptyText: { color: "#888", fontSize: 16 },
    userItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#2196F3",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
    userInfo: { flex: 1 },
    userName: { fontSize: 16, fontWeight: "600", color: "#222" },
    userStatus: { fontSize: 12, color: "#888", marginTop: 2 },
    separator: { height: 1, backgroundColor: "#eee" },
});