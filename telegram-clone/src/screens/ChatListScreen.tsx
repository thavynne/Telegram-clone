import React, { useState } from "react";
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet,
    SafeAreaView, TextInput
} from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useChat } from "../services/ChatContext";
import { logout } from "../services/authService";
import ChatItem from "../components/ChatItem";

interface ChatListScreenProps {
    navigation?: any;
    isSplitView?: boolean;
}

export default function ChatListScreen({ navigation, isSplitView }: ChatListScreenProps) {
    const { chatList, selectedChat, setSelectedChat, setContactModalVisible } = useChat();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredChats = chatList.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error: any) {
            console.error("Erro ao sair", error);
        }
    };

    const handleMenuSelect = (value: string) => {
        if (value === 'logout') {
            handleLogout();
        } else if (value === 'settings') {
            // placeholder
        } else if (value === 'new_contact') {
            setContactModalVisible(true);
        }
    };

    const handleChatPress = (chat: any) => {
        setSelectedChat(chat);
        if (!isSplitView && navigation) {
            navigation.navigate("Chat");
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chats</Text>

                <Menu onSelect={value => handleMenuSelect(value)}>
                    <MenuTrigger>
                        <View style={styles.menuTrigger}>
                            <Text style={styles.menuDots}>⋮</Text>
                        </View>
                    </MenuTrigger>

                    <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
                        <MenuOption value="new_contact" text="Novo contato" />
                        <MenuOption value="settings" text="Configurações" />
                        <MenuOption value="logout">
                            <Text style={{ color: 'red' }}>Sair da conta</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar chats..."
                    placeholderTextColor="#94a3b8"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {filteredChats.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhum chat encontrado.</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredChats}
                    renderItem={({ item }) => (
                        <ChatItem
                            name={item.name}
                            avatarUrl={item.avatarUrl}
                            lastMessage={item.lastMessage}
                            time={item.time}
                            unreadCount={item.unreadCount}
                            isActive={isSplitView && selectedChat?.id === item.id}
                            onPress={() => handleChatPress(item)}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#020617" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e293b",
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: "space-between",
    },
    headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
    menuTrigger: { padding: 8 },
    menuDots: { color: "#fff", fontSize: 24, fontWeight: "bold", lineHeight: 24 },
    menuOptions: { backgroundColor: '#1e293b', padding: 5, borderRadius: 8 },
    searchContainer: { padding: 12, backgroundColor: "#020617" },
    searchInput: {
        backgroundColor: "#0f172a",
        color: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
    },
    emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    emptyText: { color: "#64748b", fontSize: 16 },
});