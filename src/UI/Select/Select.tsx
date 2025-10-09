import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import type { Filter } from "../../types/filter";
import type { Task } from "../../types/task";
import Button from "../Button/Button";
import style from "./Select.module.scss";

type SelectProps = {
  filters: Filter<Task>[];
  activeFilter: Filter<Task>;
  setFilter: (value: string) => void;
};

export default function Select({
  filters,
  activeFilter,
  setFilter,
}: SelectProps) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [expanded]);

  return (
    <div
      ref={ref}
      className={`${style.select} ${expanded ? style["select--expanded"] : ""}`}
    >
      <Button
        className={style.select__button}
        onClick={() => setExpanded(!expanded)}
      >
        <p className={style.select__text}>{activeFilter.label}</p>
        <BsChevronDown className={style.select__icon} />
      </Button>
      <ul className={style.select__options}>
        {filters.map((filter) => (
          <li
            tabIndex={expanded ? 0 : -1}
            key={filter.value}
            className={`${style.select__option} ${
              filter.value === activeFilter.value
                ? style["select__option--active"]
                : ""
            }`}
            onClick={() => {
              setFilter(filter.value);
              setExpanded(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setFilter(filter.value);
                setExpanded(false);
              }
            }}
          >
            {filter.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
