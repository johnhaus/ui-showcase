import { HashRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import { lightTheme, darkTheme } from './theme/theme.js';
import Layout from './Layout';
import Home from './Home';
import Settings from './pages/settings/Settings';
import Todo from './pages/todo/Todo';
import Login from './pages/login/Login';
import PostsExplorer from './pages/posts-explorer/PostsExplorer';
import Page4 from './pages/Page4';
import { PreferencesProvider } from './preferences/PreferencesProvider';
import { usePreferences } from './preferences/usePreferences';
import { useResolvedTheme } from './theme/useResolvedTheme';

export default function ThemedRouter() {
  const { theme } = usePreferences();
  const resolvedTheme = useResolvedTheme(theme);

  return (
    <HashRouter>
      <ThemeProvider theme={resolvedTheme === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="todo" element={<Todo />} />
            <Route path="login" element={<Login />} />
            <Route path="posts-explorer" element={<PostsExplorer />} />
            <Route path="page4" element={<Page4 />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </HashRouter>
  );
}
