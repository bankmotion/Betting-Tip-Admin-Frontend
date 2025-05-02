import { Suspense, lazy, useEffect } from 'react';
import { Navigate, RouteObject, useNavigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from './middleware/AuthContext';
import FilteredTips from 'src/pages/FilteredTips/FilteredTipsIndex';
const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Login = Loader(lazy(() => import('src/pages/Auth/Login')));

const Allergenes = Loader(
  lazy(() => import('src/pages/Allergens/AllergensIndex'))
);

const Countries = Loader(
  lazy(() => import('src/pages/Countries/CountriesIndex'))
);

const Leagues = Loader(lazy(() => import('src/pages/Leagues/LeaguesIndex')));

const Teams = Loader(lazy(() => import('src/pages/Teams/TeamsIndex')));

const Matches = Loader(lazy(() => import('src/pages/Matches/MatchesIndex')));

const TipOptions = Loader(lazy(() => import('src/pages/TipOptions/TipOptionsIndex')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const isTokenExpired = () => {
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  return tokenExpiry ? Date.now() > parseInt(tokenExpiry) : true;
};

const AuthWrapper = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || isTokenExpired()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated && !isTokenExpired() ? children : null;
};

const routes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '',
    element: (
      <AuthWrapper>
        <SidebarLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: 'countries',
        element: <Countries />
      },
      {
        path: 'leagues',
        element: <Leagues />
      },
      {
        path: 'teams',
        element: <Teams />
      },
      {
        path: 'matches',
        element: <Matches />
      },
      {
        path: 'tip-options',
        element: <TipOptions />
      },
      {
        path: 'filtered-tips',
        element: <FilteredTips />
      }
    ]
  },
  {
    path: 'dashboard',
    element: (
      <AuthWrapper>
        <SidebarLayout />
      </AuthWrapper>
    )
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
