<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useCurrentChat } from "@/composables/useCurrentChat";
import { useMessageSender } from "@/composables/useMessageSender";
import { formatTime } from "@/utils/formatTime";
import BaseInput from "@/components/BaseInput.vue";

const router = useRouter();
const { chatId, chat: currentChat } = useCurrentChat();
const { messageText, error, send } = useMessageSender(chatId);

const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

watch(
  () => currentChat.value?.messages.length,
  () => scrollToBottom(),
  { immediate: true },
);
</script>

<template>
  <div class="chat" v-if="currentChat">
    <header class="chat__header">
      <el-button class="chat__btn-back" @click="router.push({ name: 'Home' })" circle text> ❮ </el-button>
      <el-avatar :size="40" class="chat__avatar">
        {{ currentChat.name.charAt(0) }}
      </el-avatar>
      <div class="chat__info">
        <h2 class="chat__title">{{ currentChat.name }}</h2>
        <span class="chat__status">В сети</span>
      </div>
    </header>

    <div class="chat__messages" ref="messagesContainer">
      <div
        v-for="msg in currentChat.messages"
        :key="msg.id"
        class="message"
        :class="msg.sender === 'user' ? 'message--user' : 'message--bot'"
      >
        <div class="message__bubble">
          <span class="message__text">{{ msg.text }}</span>
          <span class="message__time">{{ formatTime(msg.timestamp) }}</span>
        </div>
      </div>

      <div v-if="currentChat.messages.length === 0" class="chat__empty">
        <el-empty description="Здесь пока нет сообщений." :image-size="80" />
      </div>
    </div>

    <div class="chat__input-area">
      <BaseInput
        v-model="messageText"
        :error="error"
        placeholder="Введите сообщение..."
        @submit="send"
        size="large"
      >
        <template #append>
          <el-button type="primary" @click="send" class="chat__send-btn"> Отправить </el-button>
        </template>
      </BaseInput>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  &__header {
    padding: 15px 20px;
    border-bottom: 1px solid $c-border;
    display: flex;
    align-items: center;
    background-color: $c-bg-main;
    z-index: $z-main;
  }

  &__btn-back {
    display: none;
    margin-right: 10px;
    @include respond-to($bp-mobile) {
      display: inline-flex;
    }
  }

  &__avatar {
    margin-right: 15px;
    background-color: $c-primary;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }
  &__title {
    margin: 0 0 4px 0;
    font-size: 1.1rem;
    color: $c-text-main;
    @include text-ellipsis;
  }
  &__status {
    font-size: 0.8rem;
    color: #67c23a;
  }

  &__messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: $c-bg-sidebar;
  }

  &__input-area {
    padding: 20px 20px 0;
    background-color: $c-bg-main;
    border-top: 1px solid $c-border;

    :deep(.el-input-group) {
      display: inline-flex;
      align-items: stretch;
    }

    :deep(.el-input-group__append) {
      background-color: $c-primary;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: stretch;

      .el-button {
        color: white;
        margin: 0;
        height: 100%;
        padding: 0 20px;
        border: none;
        border-radius: 0;
        &:hover {
          opacity: 0.8;
          background-color: transparent;
        }
      }
    }
  }
}

.message {
  display: flex;
  width: 100%;
  &--user {
    justify-content: flex-end;
    .message__bubble {
      background-color: $c-bg-message-user;
      color: #fff;
      border-bottom-right-radius: 4px;
    }
  }
  &--bot {
    justify-content: flex-start;
    .message__bubble {
      background-color: $c-bg-message-bot;
      color: $c-text-main;
      border-bottom-left-radius: 4px;
    }
  }
  &__bubble {
    max-width: 65%;
    padding: 12px 16px;
    border-radius: $border-radius-msg;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
  }
  &__text {
    font-size: 0.95rem;
    line-height: 1.4;
    word-break: break-word;
  }
  &__time {
    font-size: 0.7rem;
    opacity: 0.7;
    align-self: flex-end;
    margin-top: 6px;
  }
}
</style>
