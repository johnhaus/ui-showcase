import styled from 'styled-components';
import TaskItemRow from './TaskItemRow';

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

const TaskSection = ({ title, tasks, renderButtons }) => {
  if (tasks.length === 0) return null;

  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <TaskList>
        {tasks.map((task) => (
          <TaskItemRow key={task.key} task={task} renderButtons={renderButtons} />
        ))}
      </TaskList>
    </Section>
  );
};

export default TaskSection;
