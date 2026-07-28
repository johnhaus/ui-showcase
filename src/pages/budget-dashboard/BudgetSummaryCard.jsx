import styled from 'styled-components';
import { formatCurrency } from '../../utils/formatCurrency';

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

const BudgetSummaryCard = ({ label, amount }) => (
  <SummaryCard>
    <SummaryLabel>{label}</SummaryLabel>
    <SummaryValue>{formatCurrency(amount)}</SummaryValue>
  </SummaryCard>
);

export default BudgetSummaryCard;
