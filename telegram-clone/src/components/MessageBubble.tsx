import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MessageBubbleProps {
    message: string;
    isSentByCurrentUser: boolean;
}

export default function MessageBubble({ message, isSentByCurrentUser }: MessageBubbleProps) {
    return (
        <View style={[styles.bubble, isSentByCurrentUser ? styles.myBubble : styles.otherBubble]}>
            <Text style={styles.messageText}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bubble: {
        padding: 10,
        borderRadius: 18,
        marginBottom: 10,
        maxWidth: "80%",
    },
    myBubble: {
        backgroundColor: "#3b82f6",
        alignSelf: "flex-end",
    },
    otherBubble: {
        backgroundColor: "#1e293b",
        alignSelf: "flex-start",
    },
    messageText: {
        color: "#fff",
        fontSize: 15,
    },
});