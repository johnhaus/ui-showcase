import styled from 'styled-components';
import { useEffect } from 'react';
import IconButton from '../button/IconButton';
import { FaTimes } from 'react-icons/fa';

const Overlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Container = styled.div`
  width: min(500px, 80vw);
  background: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  border-radius: 8px;
  box-shadow: 0 0px 12px ${({ theme }) => theme.colors.emphasis.high};
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const Body = styled.div`
  padding: 20px;
`;

const Modal = ({ isOpen, title, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay onClick={onClose}>
      <Container
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <Title id="modal-title">{title}</Title>

          <IconButton aria-label="Close modal" onClick={onClose}>
            <FaTimes />
          </IconButton>
        </Header>

        <Body>{children}</Body>
      </Container>
    </Overlay>
  );
};

export default Modal;
