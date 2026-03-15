import { computed } from "vue";
import { useRoute } from "vue-router";
import { useChatStore } from "@/stores/chat";

export function useCurrentChat() {
  const route = useRoute();
  const store = useChatStore();

  const chatId = computed(() => {
    const id = Number(route.params.id);
    return Number.isFinite(id) ? id : -1;
  });

  const chat = computed(() => store.getChatById(chatId.value));

  return { chatId, chat };
}
