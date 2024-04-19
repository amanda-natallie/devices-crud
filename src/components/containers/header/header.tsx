import ninjaOneBrand from 'assets/brand.svg';

function Header() {
  return (
    <header className="flex items-center bg-ninja-900 w-full h-12" data-testid="header-wrapper">
      <div className="container">
        <img alt="ninjaOne Brand" src={ninjaOneBrand} data-testid="ninja-one-brand" />
      </div>
    </header>
  );
}

export default Header;
