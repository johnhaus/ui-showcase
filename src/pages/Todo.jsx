import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const TodoWrapper = styled.div`
  background: rgba(255, 255, 255, 0.87);
  color: #242424;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 0px 8px rgba(255, 255, 255, 0.5);
`;

const Section = styled.div`
  margin-bottom: 20px;
  border-top: 1px solid #242424;
`;

const SectionTitle = styled.h3`
  font-weight: bold;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  background-color: ${(props) => (props.completed ? '#d3f9d8' : '#f9f9f9')};
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props) => (props.completed ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)')};
`;

const TaskButton = styled.button`
  background-color: ${(props) => (props.priority ? '#ff6347' : '#4caf50')};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const AddTaskButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 15px;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  margin-left: 10px;
`;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([
        ...tasks,
        { text: taskText, completed: false, priority: isPriority }
      ]);
      setTaskText('');
      setIsPriority(false);
    }
  };

  const toggleCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const togglePriority = (index) => {
    const newTasks = [...tasks];
    newTasks[index].priority = !newTasks[index].priority;
    setTasks(newTasks);
  };

  return (
    <Container>
      <TodoWrapper>
        <InputWrapper>
          <Label htmlFor="taskInput">Add a new task</Label>
          <Input
            id="taskInput"
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter task..."
          />
          <CheckboxWrapper>
            <input
              type="checkbox"
              id="priorityCheckbox"
              checked={isPriority}
              onChange={() => setIsPriority(!isPriority)}
            />
            <CheckboxLabel htmlFor="priorityCheckbox">
              Mark this task as priority
            </CheckboxLabel>
          </CheckboxWrapper>
          <AddTaskButton onClick={addTask}>Add Task</AddTaskButton>
        </InputWrapper>

        <Section>
          <SectionTitle>Priority Tasks</SectionTitle>
          <TaskList>
            {tasks
              .filter((task) => task.priority && !task.completed)
              .map((task, index) => (
                <TaskItem key={index} completed={task.completed}>
                  <span>{task.text}</span>
                  <div>
                    <TaskButton
                      priority={true}
                      onClick={() => togglePriority(index)}
                    >
                      Remove Priority
                    </TaskButton>
                    <TaskButton onClick={() => toggleCompletion(index)}>
                      {task.completed ? 'Undo' : 'Complete'}
                    </TaskButton>
                  </div>
                </TaskItem>
              ))}
          </TaskList>
        </Section>

        <Section>
          <SectionTitle>Regular Tasks</SectionTitle>
          <TaskList>
            {tasks
              .filter((task) => !task.priority && !task.completed)
              .map((task, index) => (
                <TaskItem key={index} completed={task.completed}>
                  <span>{task.text}</span>
                  <div>
                    <TaskButton
                      priority={false}
                      onClick={() => togglePriority(index)}
                    >
                      Mark as Priority
                    </TaskButton>
                    <TaskButton onClick={() => toggleCompletion(index)}>
                      {task.completed ? 'Undo' : 'Complete'}
                    </TaskButton>
                  </div>
                </TaskItem>
              ))}
          </TaskList>
        </Section>

        <Section>
          <SectionTitle>Completed Tasks</SectionTitle>
          <TaskList>
            {tasks
              .filter((task) => task.completed)
              .map((task, index) => (
                <TaskItem key={index} completed={task.completed}>
                  <span>{task.text}</span>
                  <div>
                    <TaskButton onClick={() => toggleCompletion(index)}>
                      Undo
                    </TaskButton>
                  </div>
                </TaskItem>
              ))}
          </TaskList>
        </Section>
      </TodoWrapper>
    </Container>
  );
};

export default TodoList;
