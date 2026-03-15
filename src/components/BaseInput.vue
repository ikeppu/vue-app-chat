<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  modelValue: string;
  error?: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'submit': [];
}>();

const attrs = useAttrs();

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div class="base-input">
    <el-input
      v-model="internalValue"
      :placeholder="placeholder"
      @keyup.enter="emit('submit')"
      v-bind="attrs"
      class="base-input__field"
    >
      <template #append v-if="$slots.append">
        <slot name="append" />
      </template>
    </el-input>

    <div class="base-input__error-container">
      <transition name="fade">
        <span v-if="error" class="base-input__error">{{ error }}</span>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__error-container {
    height: 20px;
    margin-top: 4px;
  }

  &__error {
    color: $c-error;
    font-size: 0.8rem;
    display: block;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
