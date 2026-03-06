import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Avatar from "./Avatar";

interface ChatItemProps {
    avatarUrl?: string;
    name: string;
    lastMessage: string;
    time: string;
    unreadCount?: number;
    isActive?: boolean;
    onPress?: () => void;
}

export default function ChatItem({ avatarUrl, name, lastMessage, time, unreadCount, isActive, onPress }: ChatItemProps) {
    return (
        <TouchableOpacity
            style={[styles.container, isActive && styles.activeContainer]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Avatar url={avatarUrl} size={45} />
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
                    <View style={styles.rightAlignedData}>
                        <Text style={styles.timeText}>{time}</Text>
                        {unreadCount && unreadCount > 0 ? (
                            <View style={styles.unreadBadge}>
                                <Text style={styles.unreadText}>{unreadCount}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                <Text style={styles.messageText} numberOfLines={1}>{lastMessage}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: "#0f172a",
        borderBottomWidth: 1,
        borderBottomColor: "#1e293b",
        alignItems: "center",
    },
    activeContainer: {
        backgroundColor: "#1e293b",
    },
    contentContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
    },
    nameText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
        flex: 1,
        marginRight: 10,
    },
    timeText: {
        color: "#94a3b8",
        fontSize: 11,
        marginBottom: 4,
    },
    rightAlignedData: {
        alignItems: "flex-end",
    },
    unreadBadge: {
        backgroundColor: "#3b82f6",
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    unreadText: {
        color: "#ffffff",
        fontSize: 10,
        fontWeight: "bold",
    },
    messageText: {
        color: "#94a3b8",
        fontSize: 13,
    },
});
