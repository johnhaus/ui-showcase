import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import { lightTheme, darkTheme } from './theme.js';
import Layout from './Layout';
import Home from './Home';
import Settings from './Settings';
import Todo from './pages/todo/Todo';
import Login from './pages/login/Login';
import PostsExplorer from './pages/PostsExplorer/PostsExplorer';
import Page4 from './pages/Page4';
import { PreferencesProvider } from './preferences/PreferencesProvider';
import { usePreferences } from './preferences/usePreferences';
import { useResolvedTheme } from './themes/useResolvedTheme';

export default function ThemedRouter() {
  const { theme } = usePreferences();
  const resolvedTheme = useResolvedTheme(theme);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
