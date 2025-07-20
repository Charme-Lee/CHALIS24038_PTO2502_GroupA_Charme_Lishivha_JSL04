/**
 * @typedef {Object} Task
 * @property {number} id - Unique identifier for the task.
 * @property {string} title - The title of the task.
 * @property {string} description - Task description.
 * @property {string} status - Task current status ('todo', 'doing', 'done').
 */

/**
 * Initial task data.
 * @type {Task[]}
 */
const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },

  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

/**
 * Depicts the current state of tasks
 * * @type {Task[]}
 * */

let currentTasksState = [...initialTasks];

/**
 * Clears existing tasks before rendering.
 * Renders all tasks from the `currentTasksState` array into their respective board columns.
 *
 * @returns {void}
 */
function renderTasks() {
  // Clear all existing tasks
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });

  currentTasksState.forEach((task) => {
    const taskElement = createTaskElement(task);
    const targetContainer = document.querySelector(
      `.column-div[data-status="${task.status}"] .tasks-container`
    );
    if (targetContainer) {
      targetContainer.appendChild(taskElement);
    }
  });
  updateTaskCountDisplays();
}

/**
 * Generates a DOM element representing a task and attaches a click handler
 * to open the task modal.
 *
 * @param {Task} task - The task to render.
 * @returns {HTMLDivElement} The task element.
 */

function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;
  taskDiv.addEventListener("click", () => openTaskModal(task));
  return taskDiv;
}

/**
 * Updates the task count displayed in each column header
 * based on the current task state.
 *
 * @returns {void}
 */
function updateTaskCountDisplays() {
  const statuses = ["todo", "doing", "done"];
  statuses.forEach((status) => {
    const count = currentTasksState.filter(
      (task) => task.status === status
    ).length;
    const headerElement = document.querySelector(
      `.column-div[data-status="${status}"] .columnHeader`
    );
    if (headerElement) {
      const currentText = headerElement.textContent.split("(")[0].trim();
      headerElement.textContent = `${currentText} (${count})`;
    }
  });
}
