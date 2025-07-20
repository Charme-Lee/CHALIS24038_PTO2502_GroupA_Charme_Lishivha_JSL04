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
    title: "Conquer React ⚛️",
    description: "Learn React.js",
    status: "todo",
  },
  {
    id: 3,
    title: "Understand Databases ⚙️",
    description: "Know how to query databases.",
    status: "todo",
  },
  {
    id: 4,
    title: "Crush Frameworks 🖼️",
    description: "Master web frameworks like Next.js, Angular, or Vue.",
    status: "todo",
  },
  {
    id: 5,
    title: "Master JavaScript 💛",
    description: "Practice JavaScript.",
    status: "doing",
  },
  {
    id: 6,
    title: "Never Give Up 🏆",
    description: "Slow and steady.",
    status: "doing",
  },
  {
    id: 7,
    title: "Explore ES6 Features 🚀",
    description: "Javascript deep dive.",
    status: "done",
  },
  {
    id: 8,
    title: "Have fun 🥳",
    description: "Rome was not built in one day!",
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

  // Description textarea
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";
  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.id = "modalTaskDescription";
  descriptionTextarea.value = task ? task.description : "";
  descriptionTextarea.placeholder =
    "e.g Pet your dog, have a cup of coffee, dance to your favourite song and come back to crush this challenge.";

  // Status dropdown
  const statusLabel = document.createElement("label");
  statusLabel.textContent = "Status";
  const statusSelect = document.createElement("select");
  statusSelect.id = "modalTaskStatus";

  // Populate dropdown options for status
  const statuses = ["todo", "doing", "done"];
  statuses.forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    // Pre-select option based on current task status or default to 'todo'
    if (task && status === task.status) {
      option.selected = true;
    } else if (!task && status === "todo") {
      option.selected = true;
    }
    statusSelect.appendChild(option);
  });

  // Action buttons container (save/create and delete)
  const actionButtonsDiv = document.createElement("div");
  actionButtonsDiv.style.display = "flex";
  actionButtonsDiv.style.gap = "10px";
  actionButtonsDiv.style.marginTop = "20px";

  // Primary action button (Save Changes or Create Task)
  const primaryButton = document.createElement("button");
  primaryButton.id = "save-button";
  primaryButton.textContent = task ? "Save Changes" : "Create Task";
  primaryButton.addEventListener("click", () => {
    if (task) {
      // Update existing task
      updateTaskState(
        task.id,
        titleInput.value,
        descriptionTextarea.value,
        statusSelect.value
      );
    } else {
      // Add new task
      addNewTask(
        titleInput.value,
        descriptionTextarea.value,
        statusSelect.value
      );
    }
    modalBackdrop.remove();
  });

  actionButtonsDiv.appendChild(primaryButton);

  // If editing, add a delete button
  if (task) {
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-button";
    deleteButton.textContent = "Delete Task";
    // Style delete button for visibility
    deleteButton.style.backgroundColor = "#EA5555";
    deleteButton.style.color = "#fff";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "100px";
    deleteButton.style.height = "40px";
    deleteButton.style.fontSize = "0.9375rem";
    deleteButton.style.fontWeight = "bold";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.padding = "10px 15px";
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
      modalBackdrop.remove();
    });
    actionButtonsDiv.appendChild(deleteButton);
  }
  // Append all fields and buttons to modal content
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(titleLabel);
  modalContent.appendChild(titleInput);
  modalContent.appendChild(descriptionLabel);
  modalContent.appendChild(descriptionTextarea);
  modalContent.appendChild(statusLabel);
  modalContent.appendChild(statusSelect);
  modalContent.appendChild(actionButtonsDiv);

  // Assemble modal and backdrop
  modal.appendChild(closeButton);
  modal.appendChild(modalContent);
  modalBackdrop.appendChild(modal);

  // Display modal on the page
  document.body.appendChild(modalBackdrop);
}

/**
 * Updates the `currentTasksState` array with changes to a specific task,
 * keeping the original `initialTasks` array unchanged.
 * Creates a new array reflecting the updated task details.
 *
 * @param {number} id - ID of the task to update.
 * @param {string} newDescription - Updated task description.
 * @param {string} newStatus - Updated task status.
 * @param {string} newTitle - Updated task title.
 * @returns {void}
 */
function updateTaskState(id, newTitle, newDescription, newStatus) {
  currentTasksState = currentTasksState.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        title: newTitle,
        description: newDescription,
        status: newStatus,
      };
    }
    return task;
  });
  renderTasks();
}
/**
 * Adds a new task to the `currentTasksState` array.
 * Assigns a unique ID and then re-renders the tasks.
 * @param {string} title - The title of the new task.
 * @param {string} description - The description of the new task.
 * @param {string} status - The status of the new task.
 * @returns {void}
 */
function addNewTask(title, description, status) {
  const newId =
    currentTasksState.length > 0
      ? Math.max(...currentTasksState.map((t) => t.id)) + 1
      : 1;
  const newTask = {
    id: newId,
    title,
    description,
    status,
  };
  currentTasksState = [...currentTasksState, newTask];
  renderTasks();
}

/**
 * Deletes a task from the `currentTasksState` array by its ID.
 * Then re-assigns the tasks.
 * @param {number} id - The ID of the task to delete.
 * @returns {void}
 */
function deleteTask(id) {
  currentTasksState = currentTasksState.filter((task) => task.id !== id);
  renderTasks();
}

/**
 * Initializes the app after the DOM has fully loaded.
 * Renders the initial tasks and sets up the "Add New Task" button listener.
 *
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  const addTaskButton = document.getElementById("add-new-task-btn");
  if (addTaskButton) {
    addTaskButton.addEventListener("click", () => openTaskModal(null));
  }
});
