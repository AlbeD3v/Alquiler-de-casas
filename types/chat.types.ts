// Tipos para chat y mensajería
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: "image" | "document" | "location";
  url: string;
  name: string;
  size?: number;
}

export interface Chat {
  id: string;
  participants: string[]; // User IDs
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatPreview {
  chatId: string;
  otherUser: {
    id: string;
    name: string;
    image?: string;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}
