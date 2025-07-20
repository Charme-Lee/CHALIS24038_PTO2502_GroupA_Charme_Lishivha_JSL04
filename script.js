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

/**
 * Opens a modal for creating a new task or editing an existing one.
 * Dynamically builds and configures the modal, input fields, and action buttons.
 * If a task is provided, the modal is pre-filled for editing; otherwise, it opens with empty fields.
 *
 * @param {Task|null} task - The task to edit, or `null` to create a new one.
 * @returns {void}
 */
function openTaskModal(task = null) {
  // Create modal backdrop (overlay)
  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "modal-backdrop";
  modalBackdrop.id = "taskModalBackdrop";

  // Create modal container
  const modal = document.createElement("div");
  modal.className = "modal";

  // Create close button for modal
  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.innerHTML = "&times;";
  closeButton.addEventListener("click", () => modalBackdrop.remove());

  // Modal title: changes depending on add/edit mode
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = task ? "Edit Task" : "Add New Task";

  // Modal content container
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // Title input field
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "modalTaskTitle";
  titleInput.value = task ? task.title : "";
  titleInput.placeholder = "e.g. Take chilled break";
