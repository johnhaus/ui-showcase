import styled from 'styled-components';

const HamburgerWrapper = styled.button`
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  span {
    height: 3px;
    width: 25px;
    background: ${({ theme }) => theme.colors.text.fixedLight};
    margin-bottom: 4px;
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const Hamburger = ({ toggle }) => (
  <HamburgerWrapper onClick={toggle} aria-label="Open menu">
    <span />
    <span />
    <span />
  </HamburgerWrapper>
);

export default Hamburger;
