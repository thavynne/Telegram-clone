import React, { useEffect, useState, createContext } from "react";
import { StatusBar, useWindowDimensions, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/services/firebase";
import { MenuProvider } from 'react-native-popup-menu';
import { ChatProvider } from "./src/services/ChatContext";

import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import ChatScreen from "./src/screens/chat/ChatScreen";
import ChatListScreen from "./src/screens/chat/ChatListScreen";
import SettingsScreen from "./src/screens/settings/SettingsScreen";

import { ThemeProvider } from "./src/context/ThemeContext";
import ProfileScreen from "./src/screens/settings/ProfileScreen";
import SecurityScreen from "./src/screens/settings/SecurityScreen";
import AppearanceScreen from "./src/screens/settings/AppearanceScreen";
import NotificationsScreen from "./src/screens/settings/NotificationsScreen";
import AboutScreen from "./src/screens/settings/AboutScreen";



const Stack = createNativeStackNavigator();

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Responsive Navigator
const ResponsiveNavigator = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Tablet breakpoint

  if (isMobile) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="Appearance" component={AppearanceScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    );
  }

  // Split View Layout
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ width: '40%', borderRightWidth: 1, borderRightColor: '#1e293b' }}>
        <ChatListScreen isSplitView={true} />
      </View>
      <View style={{ width: '60%', flex: 1 }}>
        <ChatScreen isSplitView={true} />
      </View>
    </View>
  );
};


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      <AuthContext.Provider value={{ user, loading }}>
        <ChatProvider>
          <SafeAreaProvider>
            <MenuProvider>
              <StatusBar
                barStyle="light-content"
                backgroundColor="#0f172a"
                translucent={false}
              />
              <NavigationContainer>
                {user ? (
                  <ResponsiveNavigator />
                ) : (
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                  </Stack.Navigator>
                )}
              </NavigationContainer>
            </MenuProvider>
          </SafeAreaProvider>
        </ChatProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}