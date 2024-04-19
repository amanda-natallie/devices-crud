import { useGetDevicesQuery } from 'store/api';

import { Devices, Filter, Header, TopSection } from 'components/containers';

import { HomeSkeleton } from './skeleton';

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
