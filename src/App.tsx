import "./styles/App.scss";

import SideBar from "./components/SideBar/SideBar";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import useTasks from "./hooks/useTasks";

import { useMemo } from "react";
import Guide from "./components/Guide/Guide";
import { useFilter } from "./hooks/useFilter";
import type { Filter } from "./types/filter";
import type { Task } from "./types/task";
import Select from "./UI/Select/Select";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { BsCaretLeft } from "react-icons/bs";

function App() {
  const {
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
  } = useTasks();

  const filters: Filter<Task>[] = [
    {
      value: "all",
      label: "Все",
      getFiltered: (tasks: Task[]) => tasks,
    },
    {
      value: "active",
      label: "Активные",
      getFiltered: (tasks: Task[]) => tasks.filter((task) => !task.done),
    },
    {
      value: "done",
      label: "Завершённые",
      getFiltered: (tasks: Task[]) => tasks.filter((task) => task.done),
    },
  ];

  const [filter, setFilter] = useFilter(filters, filters[0]);
  const [guideDone, setGuideDone] = useLocalStorage<boolean>(
    "guideDone",
    false
  );

  const filteredList = useMemo(
    () =>
      filter.getFiltered(
        lists.find((list) => list.id === activeList)?.tasks ?? []
      ),
    [lists, activeList, filter]
  );

  return (
    <>
      <SideBar
        lists={lists}
        activeList={activeList}
        setActiveList={setActiveList}
        addList={addList}
        removeList={removeList}
        updateList={updateList}
      />

      {guideDone ? (
        ""
      ) : (
        <Guide
          setGuideDone={() => setGuideDone(true)}
          addList={addList}
          updateList={updateList}
          addTask={addTask}
          clear={() => lists.forEach((list) => removeList(list.id))}
        />
      )}

      <main className="content">
        {activeList === "" ? (
          <div className="content__empty">
            <BsCaretLeft className="content__empty-icon"/>
            <p className="content__empty-text">Создайте новый список</p>
          </div>
        ) : (
          <>
            <TaskForm addTask={(value: string) => addTask(activeList, value)} />
            <Select
              filters={filters}
              activeFilter={filter}
              setFilter={setFilter}
            />
            <TaskList
              list={filteredList}
              toggleTask={(taskId) => toggleTask(activeList, taskId)}
              removeTask={(taskId) => removeTask(activeList, taskId)}
              updateTask={(taskId, value) =>
                updateTask(activeList, taskId, value)
              }
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
