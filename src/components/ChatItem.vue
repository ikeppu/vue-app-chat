<script setup lang="ts">
import type { Chat } from "@/stores/chat";

defineProps<{
  chat: Chat;
}>();
</script>

<template>
  <li class="chat-item">
    <router-link
      :to="{ name: 'Chat', params: { id: chat.id } }"
      class="chat-item__link"
      active-class="chat-item__link--active"
    >
      <el-avatar :size="40" class="chat-item__avatar">
        {{ chat.name.charAt(0) }}
      </el-avatar>

      <span class="chat-item__name">{{ chat.name }}</span>
    </router-link>
  </li>
</template>

<style lang="scss" scoped>
.chat-item {
  list-style: none;
  margin-bottom: 5px;

  &__link {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: $border-radius;
    text-decoration: none;
    color: $c-text-main;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $c-bg-sidebar;
    }

    &--active {
      background-color: #c6e2ff;
      font-weight: bold;

      .chat-item__avatar {
        background-color: $c-primary;
      }
    }
  }

  &__avatar {
    margin-right: 15px;
    background-color: #a0cfff;
    color: #fff;
    transition: background-color 0.2s ease;
  }

  &__name {
    font-size: 1rem;
    @include text-ellipsis;
  }
}
</style>
