import styled from 'styled-components';

const TodoItem = styled.li`
  color: ${(props) => props.theme.colors.text.fixedDark};
  background-color: ${(props) =>
    props.$completed
      ? props.theme.colors.surface.highlight
      : props.theme.colors.background.fixedLight};
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoItemRow = ({ task, renderButtons }) => (
  <TodoItem key={task.key} $completed={task.completed}>
    <span>{task.text}</span>
    <div>{renderButtons(task)}</div>
  </TodoItem>
);

export default TodoItemRow;
