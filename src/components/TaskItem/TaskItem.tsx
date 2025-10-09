import { BsFilter, BsXLg } from "react-icons/bs";
import type { Task } from "../../types/task";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import styles from "./TaskItem.module.scss";

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
      className={`${styles["list-item"]} ${
        task.done ? styles["list-item--done"] : ""
      }`}
    >
      <Button className={styles["list-item__filter"]} onClick={toggleTask}>
        <BsFilter />
      </Button>
      <input
        className={styles["list-item__checkbox"]}
        type="checkbox"
        checked={task.done}
        onChange={toggleTask}
      />
      <Input
        className={styles["list-item__input"]}
        value={task.value}
        onChange={(event) => {
          console.log(event.target.value);
          updateTask(event.target.value);
        }}
        disabled={task.done}
      />
      <Button
        className={styles["list-item__delete"]}
        onClick={removeTask}
        aria-label="Удалить задачу"
      >
        <BsXLg />
      </Button>
    </li>
  );
}
