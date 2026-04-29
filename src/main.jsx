import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PreferencesProvider } from './preferences/PreferencesProvider';
import { FeatureFlagProvider } from './context/FeatureFlagProvider';
import ThemedRouter from './ThemedRouter';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <PreferencesProvider>
      <FeatureFlagProvider>
        <ThemedRouter />
      </FeatureFlagProvider>
    </PreferencesProvider>
  </StrictMode>
);
