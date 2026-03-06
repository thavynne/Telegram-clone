import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import { auth } from "../services/firebase";

export default function ChatScreen({ navigation }: any) {

    const uid = auth.currentUser?.uid;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {

        const listenerID = "CHAT_LISTENER";

        CometChat.addMessageListener(listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: (msg: CometChat.TextMessage) => {
                    setMessages(prev => [...prev, msg]);
                }
            })
        );

        return () => {
            CometChat.removeMessageListener(listenerID);
        };

    }, []);

    const sendMessage = async () => {

        const receiverUID = "superhero1";

        const textMessage = new CometChat.TextMessage(
            receiverUID,
            message,
            CometChat.RECEIVER_TYPE.USER
        );

        CometChat.sendMessage(textMessage);

        setMessages(prev => [...prev, { text: message }]);

        setMessage("");
    };

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

            <View style={styles.container}>

                <View style={[styles.header, { zIndex: 10, elevation: 10 }]}>
                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Text style={styles.profileButtonText}>Perfil</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ flex: 1 }}
                    data={messages}
                    renderItem={({ item }) => (
                        <View style={styles.messageBubble}>
                            <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.chatArea}
                />

                <View style={styles.inputArea}>

                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Digite sua mensagem..."
                        placeholderTextColor="#888"
                    />

                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={sendMessage}
                    >
                        <Text style={styles.sendText}>➤</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#0f172a"
    },

    chatArea: {
        padding: 15
    },

    messageBubble: {
        backgroundColor: "#1e293b",
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        maxWidth: "75%",
        alignSelf: "flex-start"
    },

    messageText: {
        color: "#fff",
        fontSize: 15
    },

    inputArea: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#020617",
        borderTopColor: "#1e293b"
    },

    input: {
        flex: 1,
        backgroundColor: "#1e293b",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: "#fff",
        marginRight: 10
    },

    sendButton: {
        backgroundColor: "#3b82f6",
        width: 45,
        height: 45,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    sendText: {
        color: "#fff",
        fontSize: 18,
    },

    profileButton: {
        position: "absolute",
        top: 50,
        right: 20,
        backgroundColor: "#2563eb",
        padding: 10,
        borderRadius: 8,
    },

    header: {
        width: "100%",
        padding: 15,
        alignItems: "flex-end",
        backgroundColor: "#020617",
    },

    profileButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }

});