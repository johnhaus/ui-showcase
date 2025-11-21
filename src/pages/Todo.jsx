import React, { useState } from 'react';
import styled from 'styled-components';
import RoundButton from '../shared/Button/RoundButton';
import Button from '../shared/Button/Button';
import { FaTrashAlt, FaCheck, FaExclamation, FaUndo } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const TodoWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 0px 8px ${({ theme }) => theme.colors.lightGrey};
`;

const Section = styled.div`
  margin-bottom: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.black};
`;

const SectionTitle = styled.h3`
  font-weight: bold;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  background-color: ${(props) => (props.$completed ? props.theme.colors.lightGreen : props.theme.colors.white)};
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props) =>
    props.$completed ? 'none' : props.theme.colors.lightGrey};
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
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  font-size: 16px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  display: none;

  &:checked + label .checkmark {
    background-color: ${({ theme }) => theme.colors.red};
    border-color: ${({ theme }) => theme.colors.black};
  }

  &:checked + label .checkmark::after {
    content: '\\2713';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.white};
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
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const TodoList = () => {
  const [key, setKey] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([
        ...tasks,
        { key: key, text: taskText, completed: false, priority: isPriority },
      ]);
      setTaskText('');
      setIsPriority(false);
      setKey(key + 1);
    }
  };

  const toggleCompletion = (taskId) => {
    const newTasks = tasks.map((task) =>
      task.key === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const togglePriority = (taskId) => {
    const newTasks = tasks.map((task) =>
      task.key === taskId ? { ...task, priority: !task.priority } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.key !== taskId);
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

          <Button onClick={addTask}>Add Task</Button>
        </InputWrapper>

        {tasks.filter((task) => task.priority && !task.completed).length >
          0 && (
          <Section>
            <SectionTitle>Priority Tasks</SectionTitle>
            <TaskList>
              {tasks
                .filter((task) => task.priority && !task.completed)
                .map((task) => (
                  <TaskItem key={task.key} $completed={task.completed}>
                    <span>{task.text}</span>
                    <div>
                      <RoundButton
                        icon={<FaExclamation />}
                        $isPriority={true}
                        $priority={task.priority}
                        onClick={() => togglePriority(task.key)}
                      />
                      <RoundButton
                        icon={<FaCheck />}
                        $bgColor={({ theme }) => theme.colors.green}
                        onClick={() => toggleCompletion(task.key)}
                      />
                      <RoundButton
                        icon={<FaTrashAlt />}
                        $bgColor={({ theme }) => theme.colors.red}
                        onClick={() => deleteTask(task.key)}
                      />
                    </div>
                  </TaskItem>
                ))}
            </TaskList>
          </Section>
        )}

        <Section>
          <SectionTitle>Tasks</SectionTitle>
          <TaskList>
            {tasks
              .filter((task) => !task.priority && !task.completed)
              .map((task) => (
                <TaskItem key={task.key} $completed={task.completed}>
                  <span>{task.text}</span>
                  <div>
                    <RoundButton
                      icon={<FaExclamation />}
                      $priority={task.priority}
                      $isPriority={true}
                      onClick={() => togglePriority(task.key)}
                    />
                    <RoundButton
                      icon={<FaCheck />}
                      $bgColor={({ theme }) => theme.colors.green}
                      onClick={() => toggleCompletion(task.key)}
                    />
                    <RoundButton
                      icon={<FaTrashAlt />}
                      $bgColor={({ theme }) => theme.colors.red}
                      onClick={() => deleteTask(task.key)}
                    />
                  </div>
                </TaskItem>
              ))}
          </TaskList>
        </Section>

        {tasks.filter((task) => task.completed).length > 0 && (
          <Section>
            <SectionTitle>Completed Tasks</SectionTitle>
            <TaskList>
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <TaskItem key={task.key} $completed={task.completed}>
                    <span>{task.text}</span>
                    <div>
                      <RoundButton
                        icon={<FaUndo />}
                        $bgColor={({ theme }) => theme.colors.green}
                        onClick={() => toggleCompletion(task.key)}
                      />
                      <RoundButton
                        icon={<FaTrashAlt />}
                        $bgColor={({ theme }) => theme.colors.red}
                        onClick={() => deleteTask(task.key)}
                      />
                    </div>
                  </TaskItem>
                ))}
            </TaskList>
          </Section>
        )}
      </TodoWrapper>
    </Container>
  );
};

export default TodoList;
