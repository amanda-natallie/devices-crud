import { lazy } from 'react';
import './globals.css';

const HomePage = lazy(() => import('pages/home/home'));

function App() {
  return (
    <div data-testid="app-wrapper">
      <HomePage />
    </div>
  );
}

export default App;
