import { BsJournal, BsJournalCheck, BsXLg } from "react-icons/bs";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import style from "./SideBarItem.module.scss";

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
        style["list-item"] + " " + style[active ? "list-item--active" : ""]
      }
      onClick={onClick}
    >
      {done ? (
        <BsJournalCheck className={style["list-item__icon"]} />
      ) : (
        <BsJournal className={style["list-item__icon"]} />
      )}

      <Input
        className={style["list-item__input"]}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={!active}
      />
      <Button className={style["list-item__delete"]} onClick={onRemove}>
        <BsXLg />
      </Button>
    </li>
  );
}
