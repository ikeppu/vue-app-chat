import { ref } from "vue";

export function useFormValidation(initialValue: string = "") {
  const inputValue = ref(initialValue);
  const error = ref("");

  const validate = (errorMessage: string = "Поле не может быть пустым") => {
    if (!inputValue.value.trim()) {
      error.value = errorMessage;
      return false;
    }
    error.value = "";
    return true;
  };

  const reset = () => {
    inputValue.value = "";
    error.value = "";
  };

  return {
    inputValue,
    error,
    validate,
    reset,
  };
}
