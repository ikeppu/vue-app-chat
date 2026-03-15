<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { useChatStore } from "@/stores/chat";
import ChatItem from "./ChatItem.vue";
import CreateChatModal from "./CreateChatModal.vue";

const chatStore = useChatStore();

const isModalOpen = ref(false);
const searchQuery = ref("");

const filteredChats = computed(() => {
  if (!searchQuery.value) return chatStore.chats;
  return chatStore.chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const useVirtualScroll = computed(() => filteredChats.value.length > 10);

onMounted(() => {
  chatStore.fetchChats();
});
</script>

<template>
  <aside class="sidebar" v-loading="chatStore.isLoading">
    <div class="sidebar__header">
      <h2 class="sidebar__title">Чаты</h2>
      <el-button
        class="sidebar__btn-add"
        type="primary"
        circle
        size="small"
        @click="isModalOpen = true"
        title="Создать новый чат"
      >
        +
      </el-button>
    </div>

    <div class="sidebar__search">
      <el-input v-model="searchQuery" placeholder="Поиск..." clearable />
    </div>

    <div class="sidebar__content">
      <RecycleScroller
        v-if="useVirtualScroll"
        class="sidebar__list sidebar__virtual-list"
        :items="filteredChats"
        :item-size="60"
        key-field="id"
        v-slot="{ item }"
      >
        <ChatItem :chat="item" />
      </RecycleScroller>

      <ul class="sidebar__list" v-else-if="filteredChats.length > 0">
        <ChatItem v-for="chat in filteredChats" :key="chat.id" :chat="chat" />
      </ul>

      <div class="sidebar__empty" v-else>
        <el-empty description="Чаты не найдены" :image-size="60" />
      </div>
    </div>

    <CreateChatModal v-model="isModalOpen" />
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: $sidebar-width;
  min-width: 320px;
  background-color: $c-bg-main;
  border-right: 1px solid $c-border;
  display: flex;
  flex-direction: column;
  height: 100vh;
  z-index: $z-sidebar;

  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &__header {
    padding: 15px 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: $c-text-main;
  }

  &__search {
    padding: 10px 15px;
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 0 10px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #dcdfe6;
      border-radius: 4px;
    }
  }

  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__virtual-list {
    height: 100%;
  }

  &__empty {
    @include flex-center;
    height: 100%;
    margin-top: -20px;
  }
}
</style>
