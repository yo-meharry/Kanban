![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?logo=javascript)
![HTML5](https://img.shields.io/badge/HTML-5-orange?logo=html5)
![CSS3](https://img.shields.io/badge/CSS-3-blue?logo=css3)

---

## ✨ Features

- ➕ Add tasks with title and description
- ✏️ Edit existing tasks anytime
- 🗑️ Delete tasks
- 🖱️ Drag & drop tasks between columns
- 💾 Persistent storage using `localStorage`
- 📊 Live task counts per column
- 🎨 Clean dark UI
- ⌨️ Keyboard support (`Enter` to add, `Ctrl + Enter` in description)

---

## 🛠️ Tech Stack

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| HTML5             | Structure                         |
| CSS3              | Styling (Flexbox + CSS Variables) |
| JavaScript (ES6+) | State, DOM, Drag & Drop API       |
| localStorage      | Client-side persistence           |

No dependencies. No build step. No `npm install`.

---

## 🎯 How It Works

The entire app is driven by a single source of truth — the `data` array:

    let data = [
      { id: "1", title: "Task 1", desc: "Description", status: "todo" },
      { id: "2", title: "Task 2", desc: "Description", status: "progress" }
    ];

Every action follows the same pattern:

    User action → Update data → renderTasks() → UI updates

- **Add** → `data.push(...)`
- **Delete** → `data.filter(...)`
- **Edit** → `data.map(...)`
- **Drag & Drop** → `data.map(...)` (update `status`)

The DOM is always rebuilt from `data`, keeping UI and data in sync.
