import { deleteTaskLogic } from './Todo';
describe('deleteTaskLogic', () => {
  
  it('removes the task with the given ID', () => {
    const tasks = [
      { key: 1, text: 'Task 1', completed: false, priority: false },
      { key: 2, text: 'Task 2', completed: false, priority: false },
      { key: 3, text: 'Task 3', completed: false, priority: false },
    ];

    const taskIdToDelete = 2;

    const result = deleteTaskLogic(tasks, taskIdToDelete);

    expect(result).toEqual([
      { key: 1, text: 'Task 1', completed: false, priority: false },
      { key: 3, text: 'Task 3', completed: false, priority: false },
    ]);
  });

  it('returns an empty array if no tasks are present', () => {
    const tasks = [];
    const taskIdToDelete = 1;

    const result = deleteTaskLogic(tasks, taskIdToDelete);

    expect(result).toEqual([]);
  });

  it('does not alter the list if the task ID does not match any task', () => {
    const tasks = [
      { key: 1, text: 'Task 1', completed: false, priority: false },
      { key: 2, text: 'Task 2', completed: false, priority: false },
    ];
    const taskIdToDelete = 3;

    const result = deleteTaskLogic(tasks, taskIdToDelete);

    expect(result).toEqual(tasks);
  });

  it('handles the case where only one task exists and it is deleted', () => {
    const tasks = [
      { key: 1, text: 'Single Task', completed: false, priority: false },
    ];
    const taskIdToDelete = 1;

    const result = deleteTaskLogic(tasks, taskIdToDelete);

    expect(result).toEqual([]);
  });

  it('does not delete any tasks if the task ID does not exist in the list', () => {
    const tasks = [
      { key: 1, text: 'Task 1', completed: false, priority: false },
      { key: 2, text: 'Task 2', completed: false, priority: false },
    ];
    const taskIdToDelete = 3;

    const result = deleteTaskLogic(tasks, taskIdToDelete);

    expect(result).toEqual(tasks);
  });
});
