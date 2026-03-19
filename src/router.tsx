import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <BlogListPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
