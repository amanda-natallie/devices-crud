import { DeviceTypeSelect, SortSelect } from 'components/layout';

import './globals.css';

function App() {
  return (
    <>
      <header>
        <h1>Devices</h1>
      </header>
      <div className="flex gap-4">
        <DeviceTypeSelect />
        <SortSelect />
      </div>
    </>
  );
}

export default App;
