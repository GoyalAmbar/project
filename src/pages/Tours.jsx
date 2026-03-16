import React, { useState, useEffect } from 'react';
import TourCard from '../components/TourCard/TourCard';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <>
      <section className="bg-orange-500 py-20 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-blend-multiply relative">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">All Tours</h1>
          <p className="text-white text-lg max-w-2xl mx-auto">Explore our wide selection of handpicked tours around the globe.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10 w-full max-w-lg mx-auto bg-white rounded-full shadow-md flex overflow-hidden border border-gray-100">
             <input type="text" placeholder="Where do you want to go?" className="flex-grow px-6 py-4 outline-none text-gray-700" />
             <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 font-semibold transition">Search</button>
          </div>

          {loading && <h4 className="text-center text-xl font-medium text-gray-500 mt-10">Loading tours...</h4>}
          {error && <h4 className="text-center text-xl font-medium text-red-500 mt-10">{error}</h4>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tours?.map(tour => (
                <div key={tour._id}>
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && (
             <div className="flex justify-center items-center gap-3 mt-16 text-lg font-medium">
                {[...Array(pageCount >= 0 ? pageCount : 0).keys()].map(number => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition ${page === number ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-700 border-gray-200 hover:border-orange-500'}`}
                  >
                    {number + 1}
                  </button>
                ))}
             </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Tours;
