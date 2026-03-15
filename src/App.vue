<script setup lang="ts">
import { useRoute } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";

const route = useRoute();
</script>

<template>
  <div class="app" :class="{ 'app--in-chat': route.name === 'Chat' }">
    <AppSidebar class="app__sidebar" />

    <main class="app__main">
      <router-view v-if="route.name === 'Chat'" />

      <div class="app__empty" v-else>
        <el-empty description="Выберите чат слева" />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: $c-bg-main;
  position: relative;
  overflow: hidden;

  &__sidebar {
    @include respond-to($bp-mobile) {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      transition:
        transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
        opacity 0.3s ease;
    }
  }

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: $c-bg-main;
    z-index: $z-main;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    @include respond-to($bp-mobile) {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      transform: translateX(100%);
      box-shadow: -4px 0 15px rgba(0, 0, 0, 0.05);
    }
  }

  &__empty {
    flex: 1;
    @include flex-center;
    background-color: $c-bg-sidebar;
  }

  &--in-chat {
    @include respond-to($bp-mobile) {
      .app__sidebar {
        transform: translateX(-30%);
        opacity: 0.5;
      }

      .app__main {
        transform: translateX(0);
      }
    }
  }
}
</style>
