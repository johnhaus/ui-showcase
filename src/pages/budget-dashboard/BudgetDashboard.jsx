import styled from 'styled-components';
import { useFeatureFlag } from '../../context/useFeatureFlags';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const BudgetDashboard = () => {
  const { isEnabled, toggle } = useFeatureFlag('betaBudgetDashboard');

  return (
    <Container>
      <label>
        <input type="checkbox" checked={isEnabled} onChange={toggle} disabled />
        Enable Beta Budget Dashboard
      </label>

      {isEnabled ? (
        <div>Budget Dashboard</div>
      ) : (
        <div>Feature coming soon...</div>
      )}
    </Container>
  );
};

export default BudgetDashboard;
