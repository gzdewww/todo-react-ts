import type { Task } from "../../types/task";
import TaskItem from "../TaskItem/TaskItem";
import style from "./TaskList.module.scss";

type TaskListProps = {
  list: Task[];
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, value: string) => void;
};

export default function TaskList({
  list,
  toggleTask,
  removeTask,
  updateTask,
}: TaskListProps) {
  return list.length > 0 ? (
    <ul className={style.list}>
      {list.map((task) => {
        return (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={() => toggleTask(task.id)}
            updateTask={(text) => updateTask(task.id, text)}
            removeTask={() => removeTask(task.id)}
          />
        );
      })}
    </ul>
  ) : (
    <h1>Список пуст</h1>
  );
}
