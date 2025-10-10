import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import style from "./TaskForm.module.scss";

interface TaskFromProps {
  addTask: (value: string) => void;
}

export default function TaskForm({ addTask }: TaskFromProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      setInputValue("");
      setError("Поле не может быть пустым");
      return;
    }

    addTask(inputValue);
    setInputValue("");
  };

  return (
    <form className={style["task-form"]} onSubmit={handleSubmit}>
      <Input
        aria-label="Текст новой задачи"
        aria-invalid={Boolean(error)}
        className={style["task-form__input"]}
        onChange={(event) => {
          setInputValue(event.target.value);
          if (error) setError("");
        }}
        placeholder={"Введите задачу..."}
        value={inputValue}
        error={error}
      />
      <Button
        aria-label={`Добавить задачу "${inputValue}"`}
        className={style["task-form__button"]}
        type="submit"
      >
        <BsPlusLg />
      </Button>
    </form>
  );
}
