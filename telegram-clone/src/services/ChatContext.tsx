import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { auth } from './firebase';

interface ChatContextType {
    chatList: any[];
    setChatList: React.Dispatch<React.SetStateAction<any[]>>;
    selectedChat: any;
    setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
    sendMessage: (messageText: string) => void;
    addContact: (name: string, email: string, avatarUrl: string) => void;
    isContactModalVisible: boolean;
    setContactModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

// Helper to use chat context
export const useChat = () => useContext(ChatContext);

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const uid = auth.currentUser?.uid;
    const [selectedChat, setSelectedChat] = useState<any | null>(null);

    const [chatList, setChatList] = useState<any[]>([
        { id: "1", name: "superhero1", lastMessage: "Olá, tudo bem?", time: "10:30", avatarUrl: "", messages: [] },
        { id: "2", name: "superhero2", lastMessage: "Reunião amanhã", time: "09:12", unreadCount: 3, avatarUrl: "", messages: [] },
        { id: "3", name: "superhero3", lastMessage: "Obrigado!", time: "Ontem", avatarUrl: "", messages: [] }
    ]);

    useEffect(() => {
        const listenerID = "CHAT_LISTENER";

        CometChat.addMessageListener(listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: (msg: CometChat.TextMessage) => {
                    const senderId = msg.getSender().getUid();

                    setChatList(prevChats => prevChats.map(chat => {
                        if (chat.name.toLowerCase() === senderId.toLowerCase() || chat.id === senderId) {
                            return {
                                ...chat,
                                messages: [...chat.messages, msg],
                                lastMessage: msg.getText()
                            };
                        }
                        return chat;
                    }));

                    setSelectedChat((prevSelected: any) => {
                        if (prevSelected && (prevSelected.name.toLowerCase() === senderId.toLowerCase() || prevSelected.id === senderId)) {
                            return {
                                ...prevSelected,
                                messages: [...prevSelected.messages, msg]
                            };
                        }
                        return prevSelected;
                    });
                }
            })
        );

        return () => {
            CometChat.removeMessageListener(listenerID);
        };
    }, []);

    const sendMessage = async (message: string) => {
        if (!message.trim() || !selectedChat) return;

        const receiverUID = selectedChat.name;

        const textMessage = new CometChat.TextMessage(
            receiverUID,
            message,
            CometChat.RECEIVER_TYPE.USER
        );

        CometChat.sendMessage(textMessage);

        const newInternalMessage = { text: message, sender: { uid } };

        setChatList(prevChats => prevChats.map(chat => {
            if (chat.id === selectedChat.id) {
                return {
                    ...chat,
                    messages: [...chat.messages, newInternalMessage],
                    lastMessage: message
                };
            }
            return chat;
        }));

        setSelectedChat((prev: any) => ({
            ...prev,
            messages: [...prev.messages, newInternalMessage]
        }));
    };

    const [isContactModalVisible, setContactModalVisible] = useState(false);

    const addContact = (newContactName: string, newContactEmail: string, newContactUrl: string) => {
        if (!newContactName.trim()) return;

        const newId = (chatList.length + 1).toString();
        const newContact = {
            id: newId,
            name: newContactName,
            email: newContactEmail,
            avatarUrl: newContactUrl,
            lastMessage: "",
            time: "",
            messages: []
        };

        setChatList(prev => [newContact, ...prev]);
        setSelectedChat(newContact);
    };

    return (
        <ChatContext.Provider value={{
            chatList, setChatList, selectedChat, setSelectedChat, sendMessage, addContact,
            isContactModalVisible, setContactModalVisible
        }}>
            {children}
        </ChatContext.Provider>
    );
};
