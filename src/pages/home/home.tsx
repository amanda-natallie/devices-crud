import { lazy } from 'react';

import { useGetDevicesQuery } from 'store/api';

import { Filter, Header, TopSection } from 'components/containers';

import { HomeSkeleton } from './skeleton';

const Devices = lazy(() =>
  import('components/containers').then(module => ({ default: module.Devices })),
);

function Home() {
  const { isFetching } = useGetDevicesQuery();

  return (
    <>
      <Header />
      <div className="container">
        <TopSection />
        <Filter />
        {isFetching ? <HomeSkeleton /> : <Devices />}
      </div>
    </>
  );
}

export default Home;
