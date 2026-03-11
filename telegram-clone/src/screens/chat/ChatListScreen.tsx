import React, { useState } from "react";
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet,
    TextInput, Modal
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useChat } from "../../services/ChatContext";
import { logout } from "../../services/authService";
import ChatItem from "../../components/ChatItem";

interface ChatListScreenProps {
    navigation?: any;
    isSplitView?: boolean;
}

export default function ChatListScreen({ navigation, isSplitView }: ChatListScreenProps) {
    const { chatList, selectedChat, setSelectedChat, isContactModalVisible, setContactModalVisible, addContact } = useChat();
    const [searchQuery, setSearchQuery] = useState("");
    const [newContactName, setNewContactName] = useState("");
    const [newContactEmail, setNewContactEmail] = useState("");

    const filteredChats = chatList.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddContact = () => {

        if (!newContactName.trim()) {
            alert("Digite o nome do contato");
            return;
        }

        addContact(newContactName, newContactEmail || "", "");

        setNewContactName("");
        setNewContactEmail("");
        setContactModalVisible(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Logout feito");
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

    const handleMenuSelect = (value: any) => {
        if (value === "logout") {
            handleLogout();
        }
        if (value === "settings") {
            navigation.navigate("Settings");
        }
        if (value === "new_contact") {
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
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chats</Text>

                <Menu onSelect={handleMenuSelect}>
                    <MenuTrigger>
                        <View style={styles.menuTrigger}>
                            <Text style={styles.menuDots}>⋮</Text>
                        </View>
                    </MenuTrigger>

                    <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
                        <MenuOption value="new_contact">
                            <Text style={{ color: "#fff" }}>👤 Novo contato</Text>
                        </MenuOption>
                        <MenuOption value="settings">
                            <Text style={{ color: "#fff" }}>⚙️ Configurações</Text>
                        </MenuOption>
                        <MenuOption value="logout">
                            <Text style={{ color: 'red' }}>🚪 Sair da conta</Text>
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

            <Modal visible={isContactModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Novo Contato</Text>

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Nome do contato (obrigatório)"
                            placeholderTextColor="#94a3b8"
                            value={newContactName}
                            onChangeText={setNewContactName}
                        />

                        <TextInput
                            style={styles.modalInput}
                            placeholder="E-mail (opcional)"
                            placeholderTextColor="#94a3b8"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={newContactEmail}
                            onChangeText={setNewContactEmail}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setContactModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButtonSave} onPress={handleAddContact}>
                                <Text style={styles.modalButtonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    menuTrigger: {
        padding: 8
    },
    menuDots: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 24
    },
    menuOptions: {
        backgroundColor: '#1e293b',
        padding: 5,
        borderRadius: 8
    },
    searchContainer: {
        padding: 12,
        backgroundColor: "#020617"
    },
    searchInput: {
        backgroundColor: "#0f172a",
        color: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1, justifyContent: "center",
        alignItems: "center"
    },
    emptyText: {
        color: "#64748b",
        fontSize: 16
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#1e293b",
        borderRadius: 12,
        padding: 20,
        elevation: 10
    },
    modalTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center"
    },
    modalInput: {
        backgroundColor: "#0f172a",
        color: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#334155"
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalButtonCancel: {
        flex: 1,
        padding: 12,
        backgroundColor: "#475569",
        borderRadius: 8,
        marginRight: 10,
        alignItems: "center"
    },
    modalButtonSave: {
        flex: 1,
        padding: 12,
        backgroundColor: "#2563eb",
        borderRadius: 8,
        marginLeft: 10,
        alignItems: "center"
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center'
    }
});