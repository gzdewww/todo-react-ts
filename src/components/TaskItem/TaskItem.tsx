import { BsFilter, BsXLg } from "react-icons/bs";
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
      <Button className={style["list-item__filter"]} onClick={toggleTask}>
        <BsFilter />
      </Button>
      <input
        className={style["list-item__checkbox"]}
        type="checkbox"
        checked={task.done}
        onChange={toggleTask}
      />
      <Input
        className={style["list-item__input"]}
        value={task.value}
        onChange={(event) => {
          console.log(event.target.value);
          updateTask(event.target.value);
        }}
        disabled={task.done}
      />
      <Button
        className={style["list-item__delete"]}
        onClick={removeTask}
        aria-label="Удалить задачу"
      >
        <BsXLg />
      </Button>
    </li>
  );
}
