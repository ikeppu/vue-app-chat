import { delay } from "@/utils/delay";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type SenderRole = "user" | "bot";

export interface Message {
  id: number;
  text: string;
  sender: SenderRole;
  timestamp: Date;
}

export interface Chat {
  id: number;
  name: string;
  isFavorite: boolean;
  messages: Message[];
}

export const useChatStore = defineStore("chat", () => {
  /**
   * State
   */
  const chats = ref<Chat[]>([]);
  const isLoading = ref<boolean>(false);
  const isInitialized = ref<boolean>(false);

  /**
   * Getters
   */
  const chatsMap = computed(() => new Map(chats.value.map((c) => [c.id, c])));

  function getChatById(id: number): Chat | undefined {
    return chatsMap.value.get(id);
  }

  /**
   * Actions
   */
  const fetchChats = async () => {
    if (isInitialized.value) return;

    isLoading.value = true;
    try {
      await delay(1);

      chats.value = [
        { id: 1, name: "Рабочий чат", isFavorite: true, messages: [] },
        { id: 2, name: "Флудилка", isFavorite: false, messages: [] },
        { id: 3, name: 'Проект "Альфа"', isFavorite: true, messages: [] },
        { id: 4, name: "Дизайн-команда", isFavorite: false, messages: [] },
        { id: 5, name: "Backend разработка", isFavorite: true, messages: [] },
        { id: 6, name: "QA тестирование", isFavorite: false, messages: [] },
        { id: 7, name: "DevOps & CI/CD", isFavorite: false, messages: [] },
        { id: 8, name: "Маркетинг", isFavorite: true, messages: [] },
        { id: 9, name: "HR отдел", isFavorite: false, messages: [] },
        { id: 10, name: "Финансы", isFavorite: false, messages: [] },
        { id: 11, name: 'Проект "Бета"', isFavorite: true, messages: [] },
        { id: 12, name: "Стендапы", isFavorite: false, messages: [] },
        { id: 13, name: "Код ревью", isFavorite: true, messages: [] },
        { id: 14, name: "Архитектура", isFavorite: false, messages: [] },
        { id: 15, name: "Продуктовый чат", isFavorite: true, messages: [] },
        { id: 16, name: "Аналитика", isFavorite: false, messages: [] },
        { id: 17, name: "Поддержка клиентов", isFavorite: false, messages: [] },
        { id: 18, name: "Безопасность", isFavorite: true, messages: [] },
        { id: 19, name: "Мобильная разработка", isFavorite: false, messages: [] },
        { id: 20, name: "Frontend разработка", isFavorite: true, messages: [] },
        { id: 21, name: 'Проект "Гамма"', isFavorite: false, messages: [] },
        { id: 22, name: "Документация", isFavorite: false, messages: [] },
        { id: 23, name: "Релизы", isFavorite: true, messages: [] },
        { id: 24, name: "Баг-трекер", isFavorite: false, messages: [] },
        { id: 25, name: "Обучение", isFavorite: false, messages: [] },
        { id: 26, name: "Менторство", isFavorite: true, messages: [] },
        { id: 27, name: "Инфраструктура", isFavorite: false, messages: [] },
        { id: 28, name: "Общий чат", isFavorite: false, messages: [] },
        { id: 29, name: "Новости компании", isFavorite: true, messages: [] },
        { id: 30, name: "Random / Offtopic", isFavorite: false, messages: [] },
      ];

      isInitialized.value = true;
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const createChat = (name: string): number => {
    const newId = Date.now();

    const newChat: Chat = {
      id: newId,
      name: name,
      isFavorite: false,
      messages: [],
    };

    chats.value.push(newChat);

    return newId;
  };

  const addMessage = (chatId: number, text: string, sender: SenderRole): void => {
    const chat = chatsMap.value.get(chatId);
    if (!chat) return;

    chat.messages.push({
      id: Date.now(),
      text,
      sender,
      timestamp: new Date(),
    });
  };

  return {
    chats,
    isLoading,
    fetchChats,
    getChatById,
    addMessage,
    createChat,
  };
});
