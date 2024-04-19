import { Devices, Filter, Header, TopSection } from 'components/containers';

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <TopSection />
        <Filter />
        <Devices />
      </div>
    </>
  );
}

export default Home;
