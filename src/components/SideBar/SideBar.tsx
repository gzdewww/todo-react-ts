import { BsLayoutSidebar, BsPlusLg } from "react-icons/bs";

import type { List } from "../../types/list";
import Button from "../../UI/Button/Button";
import SideBarItem from "../SideBarItem/SideBarItem";
import style from "./SideBar.module.scss";
import { useState } from "react";

interface SideBarProps {
  lists: List[];
  activeList: string;
  setActiveList: (id: string) => void;
  addList: (title: string) => void;
  removeList: (id: string) => void;
  updateList: (id: string, title: string) => void;
}

function SideBar({
  lists,
  activeList,
  setActiveList,
  addList,
  removeList,
  updateList,
}: SideBarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={` ${style.sidebar} ${
        expanded ? style["sidebar--expanded"] : ""
      }`}
    >
      <Button
        aria-label="Открыть/закрыть боковое меню"
        className={style["sidebar__close"]}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <BsLayoutSidebar className={style["sidebar__close-icon"]} />
      </Button>
      <div className={style.sidebar__content}>
        <ul className={style.lists}>
          {lists.map((list) => (
            <SideBarItem
              key={list.id}
              value={list.title}
              active={list.id === activeList}
              done={
                list.tasks.length > 0 && !list.tasks.some((task) => !task.done)
              }
              count={list.tasks.filter((task) => !task.done).length}
              onRemove={() => removeList(list.id)}
              onClick={() => {
                setActiveList(list.id);
                setExpanded(false);
              }}
              onChange={(title: string) => {
                updateList(list.id, title);
              }}
            />
          ))}
        </ul>
        <Button
          aria-label="Добавить список"
          className={style["sidebar__button-add"]}
          onClick={() => addList("Новый список")}
        >
          <BsPlusLg className={style["button-add__icon"]} />
        </Button>
      </div>
    </aside>
  );
}

export default SideBar;
