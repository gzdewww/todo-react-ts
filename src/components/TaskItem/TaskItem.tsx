import { BsXLg } from "react-icons/bs";
import type { Task } from "../../types/task";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import style from "./TaskItem.module.scss";

interface TaskItemProps {
  task: Task;
  toggleTask: () => void;
  updateTask: (value: string) => void;
  removeTask: () => void;
}

export default function TaskItem({
  task,
  toggleTask,
  updateTask,
  removeTask,
}: TaskItemProps) {
  return (
    <li
      className={`${style["list-item"]} ${
        task.done ? style["list-item--done"] : ""
      }`}
    >
      <input
        aria-label={`${
          task.done
            ? "Отметить задачу как незавершённую"
            : "Отметить задачу как завершённую"
        }`}
        className={style["list-item__checkbox"]}
        type="checkbox"
        checked={task.done}
        onChange={toggleTask}
      />
      <Input
        aria-label={`Текст задачи: ${task.value}`}
        className={style["list-item__input"]}
        value={task.value}
        onChange={(event) => {
          console.log(event.target.value);
          updateTask(event.target.value);
        }}
        disabled={task.done}
      />
      <Button
        aria-label="Удалить задачу"
        className={style["list-item__delete"]}
        onClick={removeTask}
      >
        <BsXLg />
      </Button>
    </li>
  );
}
