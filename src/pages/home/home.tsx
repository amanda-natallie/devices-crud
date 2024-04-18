import { Filter, Header, TopSection } from 'components/containers';

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <TopSection />
        <Filter />
      </div>
    </>
  );
}

export default Home;
