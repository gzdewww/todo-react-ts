import { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import style from "./Guide.module.scss";

interface step {
  text: string;
  position: Record<string, string>;
  clipPath: Record<string, string>;
}

interface GuideProps {
  setGuideDone: () => void;
  addList: (title: string) => string;
  updateList: (id: string, title: string) => void;
  addTask: (listId: string, value: string) => void;
  clear: () => void;
}

const steps: step[] = [
  {
    text: `Здесь находятся ваши списки задач. Добавить новый список можно с
  помощью нажатия на кнопку`,
    position: { top: "2rem", left: "calc(var(--sidebar-width) + 2rem)" },
    clipPath: {
      clipPath: `polygon(
      var(--sidebar-width) 0%,
      100% 0%,
      100% 100%,
      var(--sidebar-width) 100%
    )`,
    },
  },
  {
    text: `Списки можно удалять, нажав на крестик.
    Активную задачу можно редактировать нажатием на ее название.
    После выполнения всех задач списка, он помечается выполненным`,
    position: { top: "11rem", left: "2rem" },
    clipPath: {
      clipPath: `polygon(
      0 0,
      var(--sidebar-width) 0,
      100% 0,
      100% 100%,
      0% 100%,
      0% 10.5rem,
      var(--sidebar-width) 10.5rem,
      var(--sidebar-width) 5.5rem,
      0 5.5rem
    )`,
    },
  },
  {
    text: `Здесь находятся ваши задачи. Добавить новую задачу можно введя
    текст задачи в форму и нажав на кнопку "+"`,
    position: { top: "30rem", left: "30rem" },
    clipPath: {
      clipPath: `polygon(
      0% 0%,
      var(--sidebar-width) 0%,
      var(--sidebar-width) 100%,
      0% 100%
    )`,
    },
  },
  {
    text: `Здесь находится фильтр задач по статусу. Выбрать статус можно в выпадающем меню,
    нажав на кнопку "Все"`,
    position: { top: "12rem", left: "2rem" },
    clipPath: {
      clipPath: `polygon(
        0 0,
        100% 0,
        100% 6.5rem,
        var(--sidebar-width) 6.5rem,
        var(--sidebar-width) 11rem,
        100% 11rem,
        100% 100%,
        0% 100%
      )`,
    },
  },
  {
    text: `Задачи, как и списки, можно удалять, нажав на крестик и редактировать
    нажатием на текст задачи. Статус задачи обновляется нажатием на чекбокс`,
    position: { top: "17rem", left: "2rem" },
    clipPath: {
      clipPath: `polygon(
        0 0,
        100% 0,
        100% 11rem,
        var(--sidebar-width) 11rem,
        var(--sidebar-width) 16rem,
        100% 16rem,
        100% 100%,
        0% 100%
      )`,
    },
  },
];

export default function Guide({
  setGuideDone,
  addList,
  addTask,
  clear,
}: GuideProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      addList("Пример списка 1");
      const listId = addList("Пример списка 2");

      addTask(listId, "Пример задачи 1");
      addTask(listId, "Пример задачи 2");
      addTask(listId, "Пример задачи 3");
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      clear();
    };
  }, []);

  const endGuide = () => {
    clear();
    setGuideDone();
  };

  return (
    <div className={style.guide}>
      <div className={style.guide__bg} style={steps[step].clipPath}></div>

      <article className={style.guide__window} style={steps[step].position}>
        <h2 className={style.guide__title}>Обучение</h2>
        <p className={style.guide__text}>{steps[step].text}</p>
        <div className={style.controls}>
          <Button
            aria-label="Пропустить гайд"
            className={style["controls__skip"]}
            onClick={endGuide}
          >
            Пропустить
          </Button>
          <div className={style["controls__steps"]}>
            {steps.map((_, index) => (
              <Button
                aria-label={`Шаг ${index + 1}`}
                key={index}
                className={`${style["controls__step"]} ${
                  index === step ? style["controls__step--active"] : ""
                }`}
                onClick={() => setStep(index)}
              ></Button>
            ))}
          </div>
          <Button
            aria-label="Следующий шаг"
            className={style["controls__next"]}
            onClick={() => {
              step === steps.length - 1 ? endGuide() : setStep(step + 1);
            }}
          >
            {step === steps.length - 1 ? "Завершить" : "Далее"}
          </Button>
        </div>
      </article>
    </div>
  );
}
