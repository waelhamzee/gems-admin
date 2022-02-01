import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, ProfilePage } from './pages';
import GemCategory from './pages/tasks/GemCategory';
import Gems from './pages/tasks/tasks';

const routes = [
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/gems',
    component: Gems
  },
  {
    path: '/diamonds',
    component: GemCategory
  },
  {
    path: '/precious',
    component: GemCategory
  },
  {
    path: '/semi',
    component: GemCategory
  },
  {
    path: '/opals',
    component: GemCategory
  },
  {
    path: '/other',
    component: GemCategory
  },
  {
    path: '/pearls',
    component: GemCategory
  },
  {
    path: '/rough',
    component: GemCategory
  },
  {
    path: '/home',
    component: HomePage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
