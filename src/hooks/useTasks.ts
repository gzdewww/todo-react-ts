import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo } from "react";

import type { List } from "../types/list";
import type { Task } from "../types/task";
import { useLocalStorage } from "./useLocalStorage";

export default function useTasks() {
  const [lists, setLists] = useLocalStorage<List[]>("lists", []);
  const [activeList, setActiveList] = useLocalStorage<string>("activeList", "");

  useEffect(() => {
    if (lists.length && !activeList) {
      setActiveList(lists[lists.length - 1].id);
    }
  }, [lists]);
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
        const nextActiveList =
          prev[prev.findIndex((item) => item.id === listId) - 1]?.id ??
          prev[1]?.id ??
          "";
        const updated = prev.filter((list) => list.id !== listId);
        setActiveList(updated.length > 0 ? nextActiveList : "");

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
