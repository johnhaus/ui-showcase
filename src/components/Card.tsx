import styled from 'styled-components';
import { NavLink } from 'react-router';
import { cardStyles } from '../styles/cardStyles';

const StyledCard = styled(NavLink)`
  width: 300px;
  height: 300px;
  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.colors.action.hover};
  }

  ${cardStyles}
`;

const Header = styled.h3`
  text-align: center;
`;

const TextArea = styled.div`
  padding: 8px;
`;

interface CardProps {
  to: string;
  title: string;
  children: React.ReactNode;
}

const Card = ({ to, title, children }: CardProps ) => {
  return (
    <StyledCard to={to}>
      <Header>{title}</Header>
      <TextArea>{children}</TextArea>
    </StyledCard>
  );
};

export default Card;
