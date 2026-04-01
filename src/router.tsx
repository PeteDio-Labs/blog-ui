import { createBrowserRouter } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import TagPage from './pages/TagPage';
import SearchPage from './pages/SearchPage';
import DraftsPage from './pages/DraftsPage';
import DraftReviewPage from './pages/DraftReviewPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'posts', element: <PostsPage /> },
      { path: 'posts/:slug', element: <PostPage /> },
      { path: 'tags/:tag', element: <TagPage /> },
      { path: 'search', element: <SearchPage /> },

      // Admin routes (network-gated at nginx)
      { path: 'admin/drafts', element: <DraftsPage /> },
      { path: 'admin/drafts/:id', element: <DraftReviewPage /> },
      { path: 'admin/analytics', element: <AdminAnalyticsPage /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);
