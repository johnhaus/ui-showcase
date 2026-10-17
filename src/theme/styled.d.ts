import 'styled-components';
import type { darkTheme } from './theme';

type AppTheme = typeof darkTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
