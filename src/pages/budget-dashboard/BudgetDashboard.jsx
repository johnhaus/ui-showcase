import styled from 'styled-components';
import { useFeatureFlag } from '../../context/useFeatureFlags';
import ToggleSwitch from '../../shared/toggle-switch/ToggleSwitch';
import Button from '../../shared/button/Button';
import { useState } from 'react';
import BudgetEntryForm from './BudgetEntryForm';
import Modal from '../../shared/modal/Modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
`;

const DashboardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 0px 12px ${({ theme }) => theme.colors.emphasis.high};
`;

const DashboardContent = styled.div`
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h2`
  margin: 0 0 8px;
`;

const Subtitle = styled.p`
  margin: 0;
  opacity: 0.8;
`;

const SummaryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 24px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.background.fixedLight};
  color: ${({ theme }) => theme.colors.text.fixedDark};
  padding: 16px;
  border-radius: 8px;
`;

const SummaryLabel = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const BudgetContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionCard = styled.div`
  background: ${({ theme }) => theme.colors.background.fixedLight};
  color: ${({ theme }) => theme.colors.text.fixedDark};
  border-radius: 8px;
  padding: 16px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
`;

const EmptyState = styled.p`
  margin: 0;
  opacity: 0.7;
`;

const FeatureToggle = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const EnableFeature = styled.div`
  text-align: center;
`;

const BudgetDashboard = () => {
  const { isEnabled, toggle } = useFeatureFlag('betaBudgetDashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState([]);

  const income = entries.filter((e) => e.type === 'income');
  const expenses = entries.filter((e) => e.type === 'expense');

  const totalIncome = income.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = totalIncome - totalExpenses;

  const handleAddEntry = (entry) => {
    setEntries((current) => [...current, entry]);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <FeatureToggle>
        <ToggleSwitch
          checked={isEnabled}
          onChange={toggle}
          label="Enable Beta Budget Dashboard"
        />
      </FeatureToggle>

      {isEnabled ? (
        <DashboardWrapper>
          <DashboardContent>
            <Modal
              isOpen={isModalOpen}
              title="Add Budget Entry"
              onClose={() => setIsModalOpen(false)}
            >
              <BudgetEntryForm onSubmit={handleAddEntry} />
            </Modal>
            <Header>
              <div>
                <Title>Budget Dashboard</Title>
                <Subtitle>Track your income and expenses</Subtitle>
              </div>
              <Button
                type="button"
                onClick={() => setIsModalOpen(true)}
                text="+ Add Entry"
              />
            </Header>

            <SummaryContainer>
              <SummaryCard>
                <SummaryLabel>Total Income</SummaryLabel>
                <SummaryValue>${totalIncome.toFixed(2)}</SummaryValue>
              </SummaryCard>

              <SummaryCard>
                <SummaryLabel>Total Expenses</SummaryLabel>
                <SummaryValue>${totalExpenses.toFixed(2)}</SummaryValue>
              </SummaryCard>

              <SummaryCard>
                <SummaryLabel>Remaining Budget</SummaryLabel>
                <SummaryValue>${remainingBudget.toFixed(2)}</SummaryValue>
              </SummaryCard>
            </SummaryContainer>

            <BudgetContainer>
              <SectionCard>
                <SectionTitle>Income</SectionTitle>
                {income.length === 0 ? (
                  <EmptyState>No income entries yet.</EmptyState>
                ) : (
                  <ul>
                    {income.map((entry) => (
                      <li key={entry.id}>
                        {entry.description} — ${entry.amount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                )}
              </SectionCard>

              <SectionCard>
                <SectionTitle>Expenses</SectionTitle>
                {expenses.length === 0 ? (
                  <EmptyState>No expense entries yet.</EmptyState>
                ) : (
                  <ul>
                    {expenses.map((entry) => (
                      <li key={entry.id}>
                        {entry.description} — ${entry.amount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                )}
              </SectionCard>
            </BudgetContainer>
          </DashboardContent>
        </DashboardWrapper>
      ) : (
        <EnableFeature>
          <div>Feature coming soon...</div>
          <div>Toggle checkbox to see current work in progress</div>
        </EnableFeature>
      )}
    </Container>
  );
};

export default BudgetDashboard;
