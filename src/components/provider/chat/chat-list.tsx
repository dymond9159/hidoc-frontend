"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import { mockChats } from "@/lib/mock-data/professional/chat"
import { cn } from "@/lib/utils"
import { MessageItem } from "@/types/provider/chat/types"
import { useTranslations } from "next-intl"
import { useState } from "react"

export enum ChatListTabOptions {
  InProgress = "em-andamento",
  Finalized = "consultas-finalizadas",
}

interface ChatListProps {
  onSelectChat: (chat: MessageItem) => void
  selectedChat: MessageItem | null
}

export function ChatList({ onSelectChat, selectedChat }: ChatListProps) {
  const t = useTranslations("pages.provider.quickChat")
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState(ChatListTabOptions.InProgress)

  return (
    <Tabs
      defaultValue={ChatListTabOptions.InProgress}
      className={cn("flex flex-col w-full h-[calc(100vh-140px)]", isMobile && "w-[calc(100%+20px)]")}
      onValueChange={(value) => setActiveTab(value as ChatListTabOptions)}
    >
      <TabsList className="grid grid-cols-2 h-12 w-full gap-0 p-0">
        <TabsTrigger variant="border" value={ChatListTabOptions.InProgress}>
          {t("inProgress")}
        </TabsTrigger>
        <TabsTrigger variant="border" value={ChatListTabOptions.Finalized}>
          {t("finalized")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value={ChatListTabOptions.InProgress} className="flex-1 flex flex-col overflow-hidden p-0 m-0">
        <ScrollArea className="flex-1 h-full pr-2">
          {mockChats.unread.length > 0 && (
            <>
              <h3 className="py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t("unreadMessages")}
              </h3>
              {mockChats.unread.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  onClick={() => onSelectChat(chat)}
                  isSelected={chat.id === selectedChat?.id}
                  unread
                />
              ))}
            </>
          )}

          {mockChats.read.length > 0 && (
            <>
              <h3 className="py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("readMessages")}</h3>
              {mockChats.read.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  onClick={() => onSelectChat(chat)}
                  isSelected={chat.id === selectedChat?.id}
                />
              ))}
            </>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </TabsContent>

      <TabsContent value={ChatListTabOptions.Finalized} className="flex-1 flex flex-col overflow-hidden p-0 m-0">
        <ScrollArea className="flex-1 h-full">
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("readMessages")}</h3>
          {mockChats.finished.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onClick={() => onSelectChat(chat)}
              isSelected={chat.id === selectedChat?.id}
            />
          ))}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}

interface ChatItemProps {
  chat: MessageItem
  onClick: () => void
  isSelected: boolean
  unread?: boolean
}

function ChatItem({ chat, onClick, isSelected, unread }: ChatItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-2 py-3 cursor-pointer group transition-all border-l-4 border-transparent hover:bg-secondary-1",
        isSelected && "bg-secondary-3 border-l-secondary hover:bg-secondary-3 hover:border-l-secondary",
      )}
      onClick={onClick}
    >
      <Avatar className="h-9 w-9">
        <AvatarImage src={chat?.avatar} alt={chat.name} />
        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col max-w-[180px]">
            <p className="font-semibold text-sm truncate text-gray-900">{chat.name}</p>
            <p className="text-sm text-gray-500 truncate">{chat.message}</p>
          </div>
          <div className="flex flex-col justify-end items-end">
            <p className="text-xs text-gray-500 truncate">{chat.time}</p>
            {chat.unreadCount > 0 && (
              <div className="flex-shrink-0 h-3.5 w-3.5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white">{chat.unreadCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
