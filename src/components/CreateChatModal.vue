<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useChatStore } from "@/stores/chat";
import { useFormValidation } from "@/composables/useFormValidation";
import BaseInput from "./BaseInput.vue";

const props = defineProps<{ modelValue: boolean }>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const { inputValue, error, validate, reset } = useFormValidation();
const chatStore = useChatStore();
const router = useRouter();

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const handleCreateChat = () => {
  if (!validate("Название не может быть пустым")) return;

  const id = chatStore.createChat(inputValue.value.trim());
  isOpen.value = false;
  router.push({ name: "Chat", params: { id } });
};
</script>

<template>
  <el-dialog
    v-model="isOpen"
    title="Создать новый чат"
    width="90%"
    style="max-width: 400px"
    append-to-body
    @closed="reset"
  >
    <div class="modal">
      <BaseInput
        v-model="inputValue"
        :error="error"
        placeholder="Введите название чата..."
        @submit="handleCreateChat"
        autofocus
      />
    </div>

    <template #footer>
      <div class="modal__footer">
        <el-button @click="isOpen = false">Отмена</el-button>
        <el-button type="primary" @click="handleCreateChat">Создать</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  flex-direction: column;

  &__input {
    width: 100%;
  }

  &__error {
    color: $c-error;
    font-size: 0.8rem;
    margin-top: 8px;
    padding-left: 4px;
    animation: fadeIn 0.2s ease-in-out;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
