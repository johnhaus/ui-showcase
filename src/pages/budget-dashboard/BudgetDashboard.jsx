import styled from 'styled-components';
import { useFeatureFlag } from '../../context/useFeatureFlags';
import ToggleSwitch from '../../shared/toggle-switch/ToggleSwitch';
import Button from '../../shared/button/Button';
import { useState } from 'react';
import BudgetEntryForm from './BudgetEntryForm';
import BudgetSummaryCard from './BudgetSummaryCard';
import BudgetEntryList from './BudgetEntryList';
import useBudget from './useBudget';
import Modal from '../../shared/modal/Modal';
import { ENTRY_TYPES } from './constants';

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
  const { isEnabled, toggle } = useFeatureFlag('BudgetDashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    income,
    expenses,
    totalIncome,
    totalExpenses,
    remainingBudget,
    addEntry,
    updateEntry,
    removeEntry,
  } = useBudget();

  const addBudgetEntry = (entry) => {
    addEntry(entry);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <FeatureToggle>
        <ToggleSwitch
          checked={isEnabled}
          onChange={toggle}
          label="Enable Budget Dashboard"
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
              <BudgetEntryForm onSubmit={addBudgetEntry} />
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
              <BudgetSummaryCard label="Total Income" amount={totalIncome} />
              <BudgetSummaryCard
                label="Total Expenses"
                amount={totalExpenses}
              />
              <BudgetSummaryCard
                label="Remaining Budget"
                amount={remainingBudget}
              />
            </SummaryContainer>

            <BudgetContainer>
              <SectionCard>
                <SectionTitle>Income</SectionTitle>
                <BudgetEntryList
                  entries={income}
                  emptyMessage="No income entries yet."
                  onUpdate={updateEntry}
                  onDelete={removeEntry}
                />
              </SectionCard>

              <SectionCard>
                <SectionTitle>Expenses</SectionTitle>
                <BudgetEntryList
                  entries={expenses}
                  emptyMessage="No expense entries yet."
                  onUpdate={updateEntry}
                  onDelete={removeEntry}
                />
              </SectionCard>
            </BudgetContainer>
          </DashboardContent>
        </DashboardWrapper>
      ) : (
        <EnableFeature>
          <div>Budget Dashboard is disabled</div>
          <div>Enable the feature flag above to view the dashboard</div>
        </EnableFeature>
      )}
    </Container>
  );
};

export default BudgetDashboard;
