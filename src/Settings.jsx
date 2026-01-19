import ButtonRadioGroup from './shared/ButtonRadioGroup/ButtonRadioGroup';
import { usePreferences } from './preferences/usePreferences';

export default function Settings() {
  const { theme, setTheme } = usePreferences();

  return (
    <ButtonRadioGroup
      name="theme"
      value={theme}
      onChange={setTheme}
      options={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System (follows OS)' },
      ]}
    />
  );
}
