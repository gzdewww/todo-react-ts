import { BsJournal, BsJournalCheck, BsXLg } from "react-icons/bs";
import styles from "./SideBarItem.module.scss";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

interface SideBarItemProps {
  value: string;
  active: boolean;
  done: boolean;
  onRemove: () => void;
  onClick: () => void;
  onChange: (title: string) => void;
}

export default function SideBarItem({
  value,
  active,
  done,
  onRemove,
  onClick,
  onChange,
}: SideBarItemProps) {
  return (
    <li
      tabIndex={0}
      className={
        styles["list-item"] + " " + styles[active ? "list-item--active" : ""]
      }
      onClick={onClick}
    >
      {done ? (
        <BsJournalCheck className={styles["list-item__icon"]} />
      ) : (
        <BsJournal className={styles["list-item__icon"]} />
      )}

      <Input
        className={styles["list-item__input"]}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={!active}
      />
      <Button className={styles["list-item__delete"]} onClick={onRemove}>
        <BsXLg />
      </Button>
    </li>
  );
}
