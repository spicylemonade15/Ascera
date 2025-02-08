import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import ProtectedRoute from "./components/protected-routes";
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Onboarding from './pages/onboarding'
import StartupListing from './pages/startup-listing'
import StartupPage from './pages/startup'
import PostStartup from './pages/post-startup'
import InvestorProfile from './pages/investor-profile'
import FindInvestor from './pages/find-investor'
import MyInvestors from './pages/my-investors'
import { ThemeProvider } from './components/theme-provider'
import InvestorPage from './pages/investor';

// creater router for app routing
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      }, 
      {
        path: '/onboarding',
        element:( <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>),
      },
      {
        path: '/profile',
        element:( <ProtectedRoute>
          <InvestorProfile />
        </ProtectedRoute>),
      },
      {
        path: '/startups',
        element: ( <ProtectedRoute>
          <StartupListing />
        </ProtectedRoute>),
      },
      {
        path: '/startup/:id',
        element: ( <ProtectedRoute>
          <StartupPage />
        </ProtectedRoute>),
      }, 
      {
        path: '/post-startup',
        element: ( <ProtectedRoute>
          <PostStartup />
        </ProtectedRoute>),
      }, 
      {
        path: '/investors',
        element: ( <ProtectedRoute>
          <FindInvestor />
        </ProtectedRoute>),
      },
      {
        path: '/my-investors',
        element: ( <ProtectedRoute>
          <MyInvestors />
        </ProtectedRoute>),
      },
      {
        path: '/investor/:id',
        element: ( <ProtectedRoute>
          <InvestorPage />
        </ProtectedRoute>),
      },
    
    ]
  }
])
function App() {
    return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router = { router } />
    </ThemeProvider>
    );
}

export default App
