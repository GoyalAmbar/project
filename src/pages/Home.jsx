import React from 'react';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import TourCard from '../components/TourCard/TourCard';

const Home = () => {
  const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);

  return (
    <>
      <section className="bg-gradient-to-b from-orange-50 to-white py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded-full mb-6">Know Before You Go</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Traveling opens the door to creating <span className="text-orange-500">memories</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Discover the world's most amazing destinations with our expertly curated tours. From breathtaking landscapes to vibrant cultures, your next unforgettable adventure starts here.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 h-full relative">
            <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="hero 1" className="rounded-2xl h-64 object-cover w-full shadow-lg transform translate-y-8" />
            <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="hero 2" className="rounded-2xl h-80 object-cover w-full shadow-xl" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h5 className="text-orange-500 font-bold text-lg mb-2 tracking-wide uppercase">Explore</h5>
            <h2 className="text-4xl font-extrabold text-gray-900">Our Featured Tours</h2>
          </div>

          {loading && <h4 className="text-center text-xl font-medium text-gray-500">Loading featured tours...</h4>}
          {error && <h4 className="text-center text-xl font-medium text-red-500">{error}</h4>}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTours?.map(tour => (
                <div key={tour._id}>
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
