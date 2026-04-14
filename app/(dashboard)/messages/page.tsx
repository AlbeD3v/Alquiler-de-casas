"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const mockMessages: Message[] = [
  { id: "1", sender: "Carlos Pérez", content: "Hola, ¿la villa está disponible para la próxima semana?", timestamp: "10:30 AM", isOwn: false },
  { id: "2", sender: "Tú", content: "Sí, está disponible. ¿Cuántas noches necesitas?", timestamp: "10:32 AM", isOwn: true },
  { id: "3", sender: "Carlos Pérez", content: "Serían 5 noches, del 15 al 20", timestamp: "10:35 AM", isOwn: false },
  { id: "4", sender: "Tú", content: "Perfecto, te envío los detalles por aquí", timestamp: "10:37 AM", isOwn: true },
];

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Chat List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Conversaciones
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar conversaciones..." className="pl-10 h-9" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: "Carlos Pérez", lastMessage: "Serían 5 noches...", unread: 2, time: "10:35 AM" },
            { name: "María Rodríguez", lastMessage: "Gracias por la información", unread: 0, time: "Ayer" },
            { name: "José Martínez", lastMessage: "¿Cuándo puedo visitar la propiedad?", unread: 1, time: "Lun" },
          ].map((chat, index) => (
            <button
              key={index}
              className={`w-full p-4 rounded-lg text-left transition-colors hover:bg-muted ${
                index === 0 ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sol to-oro flex items-center justify-center text-noche font-semibold">
                    {chat.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{chat.name}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{chat.time}</p>
                  {chat.unread > 0 && (
                    <div className="mt-1 px-2 py-0.5 rounded-full bg-sol text-noche text-xs font-semibold">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sol to-oro flex items-center justify-center text-noche font-semibold">
              C
            </div>
            <div>
              <CardTitle className="text-lg">Carlos Pérez</CardTitle>
              <CardDescription>En línea</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.isOwn
                      ? "bg-sol text-noche rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? "text-noche/70" : "text-muted-foreground"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Input
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setNewMessage("")}
              className="flex-1"
            />
            <Button variant="golden">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
