import { describe, it, expect } from "vitest";
import { useFormValidation } from "../../composables/useFormValidation";

describe("useFormValidation composable", () => {
  it("должен инициализироваться с пустыми значениями по умолчанию", () => {
    const { inputValue, error } = useFormValidation();
    expect(inputValue.value).toBe("");
    expect(error.value).toBe("");
  });

  it("должен возвращать false и устанавливать ошибку, если инпут пустой", () => {
    const { validate, error } = useFormValidation();

    const isValid = validate("Ошибка: пустое поле");

    expect(isValid).toBe(false);
    expect(error.value).toBe("Ошибка: пустое поле");
  });

  it("должен возвращать true и очищать ошибку, если введен текст", () => {
    const { inputValue, error, validate } = useFormValidation();

    inputValue.value = "   Привет, мир!   ";

    const isValid = validate("Ошибка");

    expect(isValid).toBe(true);
    expect(error.value).toBe("");
  });

  it("должен корректно сбрасывать состояние (метод reset)", () => {
    const { inputValue, error, reset } = useFormValidation("Начальный текст");
    error.value = "Какая-то ошибка";

    reset();

    expect(inputValue.value).toBe("");
    expect(error.value).toBe("");
  });
});
