import { BsPlusLg } from "react-icons/bs";

import { useRef, useState } from "react";
import type { List } from "../../types/list";
import Button from "../../UI/Button/Button";
import SideBarItem from "../SideBarItem/SideBarItem";
import styles from "./SideBar.module.scss";

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
  const [expanded, setExpanded] = useState<boolean>(false);
  const accordion = useRef<HTMLDivElement>(null);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__content}>
        <ul className={styles.lists}>
          {lists.map((list) => (
            <SideBarItem
              key={list.id}
              value={list.title}
              active={list.id === activeList}
              done={
                list.tasks.length > 0 && !list.tasks.some((task) => !task.done)
              }
              onRemove={() => removeList(list.id)}
              onClick={() => {
                setActiveList(list.id);
              }}
              onChange={(title: string) => {
                updateList(list.id, title);
              }}
            />
          ))}
        </ul>
        <Button
          aria-label="Добавить список"
          className={styles["sidebar__button-add"]}
          onClick={() => addList("Новый список")}
        >
          <BsPlusLg className={styles["button-add__icon"]} />
        </Button>
      </div>
    </aside>
  );
}

export default SideBar;
