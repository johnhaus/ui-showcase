import { useState } from 'react';
import styled from 'styled-components';
import RoundButton from '../../shared/Button/RoundButton';
import Button from '../../shared/Button/Button';
import { FaTrashAlt, FaCheck, FaExclamation, FaUndo } from 'react-icons/fa';
import TodoSection from './TodoSection';
import {
  addTaskLogic,
  togglePriorityLogic,
  toggleCompletionLogic,
  deleteTaskLogic,
} from './todoUtils';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const TodoWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 0px 8px ${({ theme }) => theme.colors.focus.ring};
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
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  font-size: 16px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.focus.ring};
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CheckboxInput = styled.input`
  display: none;

  &:checked + label .checkmark {
    background-color: ${({ theme }) => theme.colors.accent.primary};
    border-color: ${({ theme }) => theme.colors.border.strong};
  }

  &:checked + label .checkmark::after {
    content: '\\2713';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.text.fixedLight};
    font-size: 16px;
  }
`;

const CheckboxLabel = styled.label`
  position: relative;
  cursor: pointer;
  padding-left: 30px;

  .checkmark {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 1px solid ${({ theme }) => theme.colors.border.subtle};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.control.background};
  }
`;

const TodoList = () => {
  const [key, setKey] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  const addTask = () => {
    setTasks((prevTasks) => {
      return addTaskLogic(prevTasks, key, taskText, isPriority);
    });

    setTaskText('');
    setIsPriority(false);
    setKey((prevKey) => prevKey + 1);
  };

  const togglePriority = (taskId) => {
    setTasks((prevTasks) => {
      return togglePriorityLogic(prevTasks, taskId);
    });
  };

  const toggleCompletion = (taskId) => {
    setTasks((prevTasks) => {
      return toggleCompletionLogic(prevTasks, taskId);
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      return deleteTaskLogic(prevTasks, taskId);
    });
  };

  const priorityTasks = tasks.filter(
    (task) => task.priority && !task.completed
  );
  const normalTasks = tasks.filter((task) => !task.priority && !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

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
            <CheckboxInput
              type="checkbox"
              id="priorityCheckbox"
              checked={isPriority}
              onChange={() => setIsPriority(!isPriority)}
            />
            <CheckboxLabel htmlFor="priorityCheckbox">
              <span className="checkmark"></span>
              Mark this task as priority
            </CheckboxLabel>
          </CheckboxWrapper>

          <Button onClick={addTask} text="Add Task" size="sm"></Button>
        </InputWrapper>

        <TodoSection
          title="Priority Tasks"
          tasks={priorityTasks}
          renderButtons={(task) => (
            <>
              <RoundButton
                icon={<FaExclamation />}
                $isPriority
                $priority={task.priority}
                onClick={() => togglePriority(task.key)}
              />
              <RoundButton
                icon={<FaCheck />}
                $bgColor={({ theme }) => theme.colors.intent.success}
                onClick={() => toggleCompletion(task.key)}
              />
              <RoundButton
                icon={<FaTrashAlt />}
                $bgColor={({ theme }) => theme.colors.accent.primary}
                onClick={() => deleteTask(task.key)}
              />
            </>
          )}
        />

        <TodoSection
          title="Tasks"
          tasks={normalTasks}
          renderButtons={(task) => (
            <>
              <RoundButton
                icon={<FaExclamation />}
                $isPriority
                $priority={task.priority}
                onClick={() => togglePriority(task.key)}
              />
              <RoundButton
                icon={<FaCheck />}
                $bgColor={({ theme }) => theme.colors.intent.success}
                onClick={() => toggleCompletion(task.key)}
              />
              <RoundButton
                icon={<FaTrashAlt />}
                $bgColor={({ theme }) => theme.colors.accent.primary}
                onClick={() => deleteTask(task.key)}
              />
            </>
          )}
        />

        <TodoSection
          title="Completed Tasks"
          tasks={completedTasks}
          renderButtons={(task) => (
            <>
              <RoundButton
                icon={<FaUndo />}
                $bgColor={({ theme }) => theme.colors.intent.success}
                onClick={() => toggleCompletion(task.key)}
              />
              <RoundButton
                icon={<FaTrashAlt />}
                $bgColor={({ theme }) => theme.colors.accent.primary}
                onClick={() => deleteTask(task.key)}
              />
            </>
          )}
        />
      </TodoWrapper>
    </Container>
  );
};

export default TodoList;
