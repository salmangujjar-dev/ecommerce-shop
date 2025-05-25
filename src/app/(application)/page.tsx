import Category from '@components/page/Home/Category';
import Featured from '@components/page/Home/Featured';
import Hero from '@components/page/Home/Hero';
import Perks from '@components/page/Home/Perks';

const App = () => {
  return (
    <div className='bg-white'>
      {/* Hero section */}
      <Hero />

      <main>
        {/* Category section */}
        <Category />

        {/* Featured section */}
        <Featured index={0} />

        {/* Perks section*/}
        <Perks />
      </main>
    </div>
  );
};

export default App;
