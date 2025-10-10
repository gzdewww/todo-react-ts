import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";

import type { List } from "../types/list";
import type { Task } from "../types/task";
import { useLocalStorage } from "./useLocalStorage";

export default function useTasks() {
  const [lists, setLists] = useLocalStorage<List[]>("lists", []);
  const [activeList, setActiveList] = useLocalStorage<string>("activeList", "");

  // LISTS CRUD

  const addList = useCallback(
    (title: string) => {
      const newList: List = {
        id: nanoid(8),
        title: title,
        tasks: [],
      };
      setLists((prev) => [...prev, newList]);
      setActiveList(newList.id);

      return newList.id;
    },
    [setLists, setActiveList]
  );

  const removeList = useCallback(
    (listId: string) => {
      setLists((prev) => {
        const index = prev.findIndex((list) => list.id === listId);
        const updated = prev.filter((list) => list.id !== listId);

        if (updated.length === 0) {
          setActiveList("");
          return updated;
        }

        const next = updated[index] ?? updated[index - 1] ?? updated[0];
        setActiveList(next.id);

        return updated;
      });
    },
    [setLists, setActiveList]
  );

  const updateList = useCallback(
    (listId: string, title: string) => {
      setLists((prev) =>
        prev.map((list) => (list.id === listId ? { ...list, title } : list))
      );
    },
    [setLists]
  );

  // TASKS CRUD

  const addTask = useCallback(
    (listId: string, value: string) => {
      const newTask: Task = { id: nanoid(16), value: value, done: false };
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? { ...list, tasks: [...list.tasks, newTask] }
            : list
        )
      );
    },
    [setLists]
  );

  const removeTask = useCallback(
    (listId: string, taskId: string) => {
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                tasks: list.tasks.filter((task) => task.id !== taskId),
              }
            : list
        )
      );
    },
    [setLists]
  );

  const toggleTask = useCallback(
    (listId: string, taskId: string) => {
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === taskId ? { ...task, done: !task.done } : task
                ),
              }
            : list
        )
      );
    },
    [setLists]
  );

  const updateTask = useCallback(
    (listId: string, taskId: string, value: string) => {
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === taskId ? { ...task, value: value } : task
                ),
              }
            : list
        )
      );
    },
    [setLists]
  );

  const value = useMemo(
    () => ({
      lists,
      activeList,
      setActiveList,
      addList,
      removeList,
      updateList,
      addTask,
      toggleTask,
      removeTask,
      updateTask,
    }),
    [
      lists,
      activeList,
      setActiveList,
      addList,
      removeList,
      updateList,
      addTask,
      toggleTask,
      removeTask,
      updateTask,
    ]
  );

  return value;
}
