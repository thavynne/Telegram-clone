import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../App";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ChatListScreen from "../screens/chat/ChatListScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";

import ProfileScreen from "../screens/settings/ProfileScreen";
import SecurityScreen from "../screens/settings/SecurityScreen";
import AppearanceScreen from "../screens/settings/AppearanceScreen";
import NotificationsScreen from "../screens/settings/NotificationsScreen";
import AboutScreen from "../screens/settings/AboutScreen";  

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const { user } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Screen name="ChatList" component={ChatListScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Security" component={SecurityScreen} />
                    <Stack.Screen name="Appearance" component={AppearanceScreen} />
                    <Stack.Screen name="Notifications" component={NotificationsScreen} />
                    <Stack.Screen name="About" component={AboutScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}