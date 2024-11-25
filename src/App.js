import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import GlobalMarket from './components/GlobalMarket';
import Assistant from './components/Assistant';
import Profile from './components/Profile';
import LearningHub from './pages/LearningHub';
import IncentiveHub from './components/IncentiveHub';
import Analytics from './pages/Analytics';

const PUBLISHABLE_KEY = "pk_test_dG91Y2hpbmctY29sbGllLTMyLmNsZXJrLmFjY291bnRzLmRldiQ"

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          baseTheme: undefined,
          variables: {
            colorPrimary: '#0B96E6',
            colorTextOnPrimaryBackground: 'white',
          },
          layout: {
            socialButtonsPlacement: 'bottom',
            socialButtonsVariant: 'iconButton',
            termsPageUrl: 'https://clerk.com/terms'
          }
        }}
      >
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/global-market" element={<GlobalMarket />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learning-hub" element={<LearningHub />} />
              <Route path="/incentive" element={<IncentiveHub />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </Router>
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default App;
