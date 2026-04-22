'use client'

import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { MessageCircle, Send, Search } from 'lucide-react'

interface ChatPreview {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  property: string
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

const CHATS: ChatPreview[] = [
  { id: '1', name: 'Carlos Pérez', lastMessage: 'Serían 5 noches, del 15 al 20', time: '10:35', unread: 2, online: true, property: 'Villa Colonial en La Habana Vieja' },
  { id: '2', name: 'María Rodríguez', lastMessage: 'Gracias por la información', time: 'Ayer', unread: 0, online: false, property: 'Apartamento Moderno en Vedado' },
  { id: '3', name: 'José Martínez', lastMessage: '¿Cuándo puedo visitar la propiedad?', time: 'Lun', unread: 1, online: false, property: 'Casa de Playa en Varadero' },
]

const MESSAGES: Message[] = [
  { id: '1', sender: 'Carlos Pérez', content: 'Hola, ¿la villa está disponible para la próxima semana?', timestamp: '10:30', isOwn: false },
  { id: '2', sender: 'Tú', content: 'Sí, está disponible. ¿Cuántas noches necesitás?', timestamp: '10:32', isOwn: true },
  { id: '3', sender: 'Carlos Pérez', content: 'Serían 5 noches, del 15 al 20', timestamp: '10:35', isOwn: false },
  { id: '4', sender: 'Tú', content: 'Perfecto, te envío los detalles de precio y condiciones', timestamp: '10:37', isOwn: true },
  { id: '5', sender: 'Carlos Pérez', content: 'Genial, quedamos así. Muchas gracias', timestamp: '10:38', isOwn: false },
]

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string>('1')
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>(MESSAGES)

  const active = CHATS.find((c) => c.id === activeChat)!

  const sendMessage = () => {
    const text = newMessage.trim()
    if (!text) return
    setMessages((prev) => [...prev, {
      id: String(Date.now()),
      sender: 'Tú',
      content: text,
      timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    }])
    setNewMessage('')
  }

  return (
    <div className="flex gap-4 h-[calc(100vh-7rem)] overflow-hidden">

      {/* ── Sidebar: lista de conversaciones ── */}
      <aside className="w-72 shrink-0 flex flex-col rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border/40 space-y-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground font-playfair">Conversaciones</h2>
            <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-sol text-noche">
              {CHATS.reduce((s, c) => s + c.unread, 0)}
            </span>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input placeholder="Buscar..." className="pl-8 h-8 text-xs" />
          </div>
        </div>

        {/* List */}
        <nav className="flex-1 overflow-y-auto py-1">
          {CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={cn(
                'w-full px-4 py-3 flex items-start gap-3 text-left transition-colors',
                activeChat === chat.id
                  ? 'bg-sol/8 border-l-2 border-sol'
                  : 'border-l-2 border-transparent hover:bg-surface-container'
              )}
            >
              <div className="relative shrink-0">
                <Avatar size="sm" fallback={chat.name} />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-palma border border-surface-container-lowest" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={cn('text-xs font-semibold truncate', activeChat === chat.id ? 'text-sol' : 'text-foreground')}>
                    {chat.name}
                  </p>
                  <span className="text-[10px] text-muted-foreground shrink-0 ml-1">{chat.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{chat.lastMessage}</p>
                <p className="text-[10px] text-muted-foreground/60 truncate mt-0.5">{chat.property}</p>
              </div>
              {chat.unread > 0 && (
                <span className="shrink-0 h-4 w-4 rounded-full bg-sol text-noche text-[10px] font-bold flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Panel chat ── */}
      <div className="flex-1 flex flex-col rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] overflow-hidden min-w-0">

        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/40 shrink-0">
          <div className="relative">
            <Avatar size="sm" fallback={active.name} />
            {active.online && (
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-palma border border-surface-container-lowest" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground font-playfair">{active.name}</p>
            <p className="text-[11px] text-muted-foreground">
              {active.online ? 'En línea' : 'Desconectado'} · {active.property}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={cn('flex', msg.isOwn ? 'justify-end' : 'justify-start')}>
              {!msg.isOwn && (
                <div className="mr-2 shrink-0 mt-0.5">
                  <Avatar size="xs" fallback={active.name} />
                </div>
              )}
              <div className={cn(
                'max-w-[72%] px-3.5 py-2.5 rounded-2xl text-sm',
                msg.isOwn
                  ? 'bg-sol text-noche rounded-br-md'
                  : 'bg-surface-container text-foreground rounded-bl-md'
              )}>
                <p className="leading-snug">{msg.content}</p>
                <p className={cn('text-[10px] mt-1', msg.isOwn ? 'text-noche/60 text-right' : 'text-muted-foreground')}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-t border-border/40 shrink-0">
          <Input
            placeholder="Escribí un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
            className="flex-1 h-9 text-sm"
          />
          <Button
            variant="golden"
            size="sm"
            className="h-9 w-9 p-0 shrink-0"
            onClick={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
