import { lazy } from 'react';
import './globals.css';

const HomePage = lazy(() => import('pages/home/home'));

function App() {
  return (
    <div data-testid="app-wrapper" className="h-screen max-h-screen">
      <HomePage />
    </div>
  );
}

export default App;
