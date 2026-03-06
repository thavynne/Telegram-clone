import React, { useState, useRef } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Modal
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChat } from "../services/ChatContext";
import { auth } from "../services/firebase";
import MessageBubble from "../components/MessageBubble";
import InputMessage from "../components/InputMessage";
import Avatar from "../components/Avatar";

interface ChatScreenProps {
    navigation?: any;
    isSplitView?: boolean;
}

export default function ChatScreen({ navigation, isSplitView }: ChatScreenProps) {
    const uid = auth.currentUser?.uid;
    const { selectedChat, sendMessage, addContact, isContactModalVisible, setContactModalVisible } = useChat();
    const [message, setMessage] = useState("");

    // Modal States for New Contact
    const [newContactName, setNewContactName] = useState("");
    const [newContactEmail, setNewContactEmail] = useState("");
    const [newContactUrl, setNewContactUrl] = useState("");

    const flatListRef = useRef<FlatList>(null);

    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage("");
        }
    };

    const handleAddContact = () => {
        addContact(newContactName, newContactEmail, newContactUrl);
        setContactModalVisible(false);
        setNewContactName("");
        setNewContactEmail("");
        setNewContactUrl("");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }} edges={isSplitView ? [] : ['top', 'bottom', 'left', 'right']}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.container}>
                    {selectedChat ? (
                        <>
                            <View style={styles.chatHeader}>
                                {!isSplitView && navigation && (
                                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                        <Text style={styles.backButtonText}>← </Text>
                                    </TouchableOpacity>
                                )}
                                <Avatar url={selectedChat.avatarUrl} size={40} />
                                <Text style={styles.chatHeaderTitle}>{selectedChat.name}</Text>
                            </View>

                            <FlatList
                                ref={flatListRef}
                                style={{ flex: 1 }}
                                data={selectedChat.messages}
                                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                                renderItem={({ item }) => {
                                    const isSentByMe = item.sender?.uid === uid || !item.sender;
                                    return (
                                        <MessageBubble
                                            message={item.text}
                                            isSentByCurrentUser={isSentByMe}
                                        />
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={styles.chatArea}
                            />

                            <InputMessage
                                value={message}
                                onChangeText={setMessage}
                                onSend={handleSend}
                            />
                        </>
                    ) : (
                        <View style={styles.emptyChatContainer}>
                            <Text style={styles.emptyChatText}>Selecione um chat para começar a enviar mensagens</Text>
                        </View>
                    )}

                    {/* FAB moved here to affect the whole screen in split view, or just chatlist in mobile, 
                        Wait, in telegram style mobile, FAB is on the ChatList. Let's move this to ChatListScreen or app level. 
                        Actually, it should be on ChatListScreen. I will show it here conditionally or move it entirely.
                    */}
                </View>

                {/* Modal de Novo Contato */}
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

                            <TextInput
                                style={styles.modalInput}
                                placeholder="URL do Avatar (opcional)"
                                placeholderTextColor="#94a3b8"
                                value={newContactUrl}
                                onChangeText={setNewContactUrl}
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
            </KeyboardAvoidingView>

            {/* FAB explicitly managed by context / app state if needed. But for now, putting it in ChatListScreen is better. Let's leave modal here and trigger it from context, or move modal to App.tsx */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a"
    },
    chatHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#1e293b",
        backgroundColor: "#020617"
    },
    backButton: {
        marginRight: 10,
        padding: 5,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 24,
    },
    chatHeaderTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 12
    },
    chatArea: {
        padding: 15
    },
    emptyChatContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a"
    },
    emptyChatText: {
        color: "#94a3b8",
        fontSize: 16,
        paddingHorizontal: 20,
        textAlign: "center"
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