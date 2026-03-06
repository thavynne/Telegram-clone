import { CometChat } from "@cometchat/chat-sdk-react-native";

const appID = process.env.EXPO_PUBLIC_COMETCHAT_APP_ID || "";
const region = process.env.EXPO_PUBLIC_COMETCHAT_REGION || "us";
const authKey = process.env.EXPO_PUBLIC_COMETCHAT_AUTH_KEY || "";

const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .autoEstablishSocketConnection(true)
    .build();

export const initCometChat = async () => {
    await CometChat.init(appID, appSetting);
};

export const loginCometChat = async (uid: string) => {
    await CometChat.login(uid, authKey);
};

export const logoutCometChat = async () => {
    await CometChat.logout();
}

export const createCometChatUser = async (uid: string, name: string) => {
    const user = new CometChat.User(uid);
    user.setName(name);
    await CometChat.createUser(user, authKey);
};