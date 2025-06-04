import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/loading/LoadingScreen';
import HomePage from './pages/HomePage';
import Navigation from './components/navigation/Navigation';
import { AppProvider } from './context/AppContext';

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen bg-deep-space text-neon-blue overflow-x-hidden">
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loading" />
          ) : (
            <Layout key="main">
              <Navigation />
              <HomePage />
            </Layout>
          )}
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}

export default App;