export const addTaskLogic = (tasks, key, text, isPriority) => {
  if (text.trim() === '') return tasks;

  return [
    ...tasks,
    {
      key,
      text,
      completed: false,
      priority: isPriority,
    },
  ];
};

export const togglePriorityLogic = (tasks, taskId) => {
  return tasks.map((task) => {
    return task.key === taskId
      ? { ...task, priority: !task.priority }
      : task;
  });
};

export const toggleCompletionLogic = (tasks, taskId) => {
  return tasks.map((task) => {
    return task.key === taskId
      ? { ...task, completed: !task.completed }
      : task;
  });
};

export const deleteTaskLogic = (tasks, taskId) => {
  return tasks.filter((task) => {
    return task.key !== taskId;
  });
};
