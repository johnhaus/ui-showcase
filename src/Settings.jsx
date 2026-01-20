import ButtonRadioGroup from './shared/ButtonRadioGroup/ButtonRadioGroup';
import { usePreferences } from './preferences/usePreferences';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const SectionTitle = styled.h3`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Settings() {
  const { theme, setTheme } = usePreferences();

  return (
    <Container>
      <SectionTitle>Color mode</SectionTitle>
      <ControlContainer>
        <ButtonRadioGroup
          name="theme"
          value={theme}
          onChange={setTheme}
          fullWidth
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System (follows OS)' },
          ]}
        />
      </ControlContainer>
    </Container>
  );
}
