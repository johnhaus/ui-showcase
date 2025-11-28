/** @type { import('@storybook/react-vite').Preview } */
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme.js';
import GlobalStyles from '../src/GlobalStyles';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
};

export default preview;
