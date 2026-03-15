import { type Ref } from "vue";
import { useChatStore } from "@/stores/chat";
import { useFormValidation } from "./useFormValidation";
import { delay } from "@/utils/delay";

export const useMessageSender = (chatId: Ref<number>) => {
  const store = useChatStore();

  const { inputValue: messageText, error, validate, reset } = useFormValidation();

  const send = async (): Promise<void> => {
    if (!validate("Сообщение не может быть пустым")) {
      return;
    }

    const text = messageText.value.trim();
    store.addMessage(chatId.value, text, "user");
    reset();

    await delay(1.5);
    store.addMessage(chatId.value, `Бот получил ваше сообщение: "${text}"`, "bot");
  };

  return { messageText, error, send };
};
