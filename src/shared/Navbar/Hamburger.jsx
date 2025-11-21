import styled from 'styled-components';

const HamburgerWrapper = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 3px;
    width: 25px;
    background: ${({ theme }) => theme.colors.white};
    margin-bottom: 4px;
    border-radius: 2px;
  }
  

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Hamburger = ({ toggle }) => (
  <HamburgerWrapper onClick={toggle}>
    <span></span>
    <span></span>
    <span></span>
  </HamburgerWrapper>
);

export default Hamburger;
