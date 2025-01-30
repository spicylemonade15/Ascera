import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Onboarding from './pages/onboarding'
import StartupListing from './pages/startup-listing'
import StartupPage from './pages/startup'
import PostStartup from './pages/post-startup'
import InvestorProfile from './pages/investor-profile'
import FindInvestor from './pages/find-investor'
import MyInvestors from './pages/my-investors'

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
        element: <Onboarding />
      },
      {
        path: '/profile',
        element: <InvestorProfile />
      },
      {
        path: '/startups',
        element: <StartupListing />
      },
      {
        path: '/startup/:id',
        element: <StartupPage />
      }, 
      {
        path: '/post-startup',
        element: <PostStartup />
      }, 
      {
        path: '/investors',
        element: <FindInvestor />
      },
      {
        path: 'my-investors',
        element: <MyInvestors />
      }

    ]
  }
])
function App() {
    return <RouterProvider router = { router } />;
}

export default App
