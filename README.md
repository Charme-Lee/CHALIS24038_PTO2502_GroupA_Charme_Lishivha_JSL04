# JSL04 Project: Kanban (Task Manager)

## 🚀 Brief : Dynamic Task Display & Modal View

💡*This project is a continuation of JSL03*

## 📋 Overview

This project presents a visually precise Kanban board designed to closely reflect the original Figma design specifications. The user interface features clearly defined task columns, a static sidebar for streamlined navigation, and a cohesive visual theme that ensures a polished and professional experience across both desktop and mobile platforms.
The application is a responsive, browser-based task manager that enables users to visually organize and monitor tasks through three workflow stages: TODO, DOING, and DONE. With its clean layout and interactive prompt-based task input, it provides an intuitive and accessible entry point to effective task management.

This project involves creating a simple task management system where users can add up to three new tasks to an existing task array. Tasks are stored as objects in an array, each with a unique incremental ID. Users will enter task details via prompts, and the system will allow filtering to view only completed tasks. The project focuses on array manipulation, user interaction via prompts and alerts, and console logging for task management.
It includes logic to handle user interaction for adding tasks, prompting for the task's title, description, and status, while validating input to ensure a correct status is entered. The system also enforces a task limit, alerting the user if the maximum number of tasks has been reached.This project demonstrates effective DOM manipulation, responsive event handling, and a clean, modular JavaScript architecture designed for scalability and maintainability.

## ✨ Key Features & Updates

### Core features

- ✅ Responsive layout with a three-column Kanban board
- ✅ Console logs completed (`done`) tasks only
- ✅ Friendly fallback message if no tasks are completed
- ✅ Sidebar with custom branding and intuitive navigation
- ✅ Case-insensitive status input (e.g., `todo`,`Doing`, `DONE`)
- ✅ Alerts and re-prompting for invalid statuses
- ✅ No Hard-Coded Tasks: All tasks are dynamically generated from JavaScript data, ensuring no hard-coded task content remains in the HTML.
- ✅ Semantic HTML and well-commented JavaScript for easy maintenance
- ✅Favicon Assets – SVG Icons

### New Features:

- Added Features
  📦 Structured Task Storage: Tasks are stored as objects within an array for organized data management.

- ➕ Add New Tasks: Users can add up to three new tasks to the existing list.

- 🆔 Unique Task IDs: Each new task is assigned a unique incremental ID, continuing from the last task in the array.

- 📝 Prompt-Based Input: Users are prompted to enter title, description, and status, which are saved in the task object.

- 🚫 Task Limit Alert: When the task limit is reached, users see an alert:
  "There are enough tasks on your board, please check them in the console."

- 🔍 Filter Completed Tasks: A dedicated function filters and displays only tasks with status "done".

- 📋 Console Logging:

- Logs only completed tasks under a "Completed Tasks" section for quick access.

## 🛠️ Technologies Used

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)

![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

## ⚙️ Set up instructions

1. **Clone the Repository**

```bash
git clone
https://github.com/Charme-Lee/CHALIS24038_PTO2502_GroupA_Charme_Lishivha_JSL03.git
```

2. **Open the Project Folder**

```bash
cd
CHALIS24038_PTO2502_GroupA_Charme_Lishivha_JSL03
```

3. 🚀 **Launch the App**

- Use a Live Server extension in your IDE for ease of use.
  Alternatively,
- Open index.html file directly from your web browser (i.e. Drag and drop the file onto the browser)

## 🧑‍💻 Usage Instructions

### ⚡ At Startup

1. Open the Kanban app in your browser.
2. Browser prompt will pop up requesting user details

### 🗒️ Enter Task Details

Each task has 3 prompts:

- **Title** (e.g., `"Breakfast"`)
- **Description** (e.g., `"Overnight oats"`)
- **Status**:
  - Valid options: `todo`, `doing`, `done`
  - If the input is invalid, an alert will appear and you’ll be asked to re-enter it.
  - There is a limit set for the number of task that can be added, once reached, user will be alerted that additional tasks cannot be added.

### 💻 Console Output (Browsers Dev tools)

- Once all tasks have been added succesfully, the console will print:

![title prompt](./explainer-images/consolelog.png)

## 📖 Usage Example 👍

**Prompt Input(s):**

- Task 1:

  - Title: `Gym`
  - Description: `Work those muscles`
  - Status: `todo`

- Task 2:
  - Title: `Sleep`
  - Description: `Rest that bod`
  - Status: `done`

**Console Output:**

```js
📋 All Tasks:
[
  0:{ id: 1, title: "Gym", description: `Work those muscles`, status: "todo"},
 1:{id: 2, title: "Sleep", description: `Rest that bod`, status: "done"}
]

✅ Completed Tasks:
[
  { id: 2, title: "Sleep", description: `Rest that bod`, status: "done"}
]

```
