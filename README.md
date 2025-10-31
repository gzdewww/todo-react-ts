# 📝 Todo List App — React + TypeScript

## 📖 Описание проекта

Интерактивное приложение для управления списками задач с системой фильтров, локальным сохранением данных и встроенным onboarding-гайдом для первого запуска.

Разработано в рамках тестового задания с упором на чистоту архитектуры, отзывчивость интерфейса и современный стек.

##№ Demo

Посмотреть [демо](https://todolisttsreact.netlify.app/)

### Скриншот приложения

## ![Preview of the Todo List App](public/screenshot.png)

## 🚀 Технологии

- **React 19** — функциональные компоненты и хуки (`useState`, `useEffect`, `useCallback`, `useMemo`)
- **TypeScript** — строгая типизация данных и компонентов
- **Vite** — мгновенная сборка и HMR
- **SCSS Modules** — изолированные стили с BEM-структурой
- **LocalStorage** — персистентность данных между сессиями

---

## ⚙️ Функциональность

- Создание и удаление списков задач
- Добавление, редактирование и удаление задач внутри списка
- Фильтрация задач по статусу: **Все / Активные / Выполненные**
- Отметка задач как завершённых (checkbox)
- Подсчёт количества активных задач
- Автоматическое сохранение данных в `localStorage`
- Полностью кастомный **Select-компонент** с анимацией
- Интерактивный **гайд по интерфейсу (Guide)**, объясняющий логику работы приложения при первом запуске
- Поддержка управления клавиатурой

---

## 🧠 Архитектура

- Логика вынесена в пользовательские хуки:
  - `useTasks` — управление задачами и списками
  - `useLocalStorage` — синхронизация состояния с localStorage
- UI-компоненты атомарные, с чётким разграничением ответственности
- Стили написаны по принципу **BEM + CSS Variables**

<details>
<summary>📁 src/ — развернуть структуру</summary>

```text
├── App.tsx
├── main.tsx
├── UI/
│   ├── Button/
│   │   ├── Button.module.scss
│   │   └── Button.tsx
│   ├── Input/
│   │   ├── Input.module.scss
│   │   └── Input.tsx
│   └── Select/
│       ├── Select.module.scss
│       └── Select.tsx
├── assets/
│   └── fonts/
│       ├── Lato-Bold.woff
│       ├── Lato-Bold.woff2
│       ├── Lato-Regular.woff
│       ├── Lato-Regular.woff2
│       ├── Lato-Italic.woff
│       └── Lato-Italic.woff2
├── components/
│   ├── Guide/
│   │   ├── Guide.module.scss
│   │   └── Guide.tsx
│   ├── Sidebar/
│   │   ├── Sidebar.module.scss
│   │   └── Sidebar.tsx
│   ├── TaskForm/
│   │   ├── TaskForm.module.scss
│   │   └── TaskForm.tsx
│   ├── TaskItem/
│   │   ├── TaskItem.module.scss
│   │   └── TaskItem.tsx
│   └── TaskList/
│       ├── TaskList.module.scss
│       └── TaskList.tsx
├── hooks/
│   ├── useFilter.ts
│   ├── useLocalStorage.ts
│   └── useTasks.ts
├── styles/
│   ├── App.scss
│   ├── fonts.scss
│   ├── index.scss
│   └── mixins.scss
└── types/
    ├── filter.ts
    ├── list.ts
    └── task.ts

```

</details>

---

## 📦 Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить проект в режиме разработки
npm run dev
```
