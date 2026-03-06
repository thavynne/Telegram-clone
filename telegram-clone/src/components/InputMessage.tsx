import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

interface InputMessageProps {
    value: string;
    onChangeText: (text: string) => void;
    onSend: () => void;
    placeholder?: string;
}

export default function InputMessage({ value, onChangeText, onSend, placeholder = "Digite uma mensagem..." }: InputMessageProps) {
    const handleSend = () => {
        if (value.trim().length > 0) {
            onSend();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                multiline
            />
            <TouchableOpacity
                style={[styles.sendButton, value.trim().length === 0 && styles.sendButtonDisabled]}
                onPress={handleSend}
                disabled={value.trim().length === 0}
            >
                <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#020617",
        borderTopColor: "#1e293b",
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        backgroundColor: "#1e293b",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: "#fff",
        marginRight: 10,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: "#3b82f6",
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: "center",
        alignItems: "center",
    },
    sendButtonDisabled: {
        backgroundColor: "#334155",
    },
    sendText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
