import styled from 'styled-components';
import TodoItemRow from './TodoItemRow';

const Section = styled.div`
  margin-bottom: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.strong};
`;

const SectionTitle = styled.h3`
  font-weight: bold;
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoSection = ({ title, tasks, renderButtons }) => {
  if (tasks.length === 0) return null;

  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <TodoList>
        {tasks.map((task) => (
          <TodoItemRow
            key={task.key}
            task={task}
            renderButtons={renderButtons}
          />
        ))}
      </TodoList>
    </Section>
  );
};

export default TodoSection;
