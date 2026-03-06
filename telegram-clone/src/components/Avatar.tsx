import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface AvatarProps {
    url?: string;
    size?: number;
}

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Avatar({ url, size = 50 }: AvatarProps) {
    return (
        <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
            <Image
                source={{ uri: url || DEFAULT_AVATAR }}
                style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1e293b",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    image: {
        backgroundColor: "#334155",
    },
});
