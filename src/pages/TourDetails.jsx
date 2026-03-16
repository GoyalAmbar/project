import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

const TourDetails = () => {
  const { id } = useParams();
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  if (loading) return <h4 className="text-center text-xl text-gray-500 py-20">Loading...</h4>;
  if (error) return <h4 className="text-center text-xl text-red-500 py-20">{error}</h4>;
  if (!tour) return <h4 className="text-center text-xl text-gray-500 py-20">Tour not found</h4>;

  const { title, desc, price, address, photo, city, distance, maxGroupSize, reviews } = tour;

  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
  const avgRating = totalRating === 0 ? '' : totalRating === 1 ? totalRating : (totalRating / reviews?.length).toFixed(1);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <img src={photo || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt="" className="w-full h-96 object-cover" />
                <div className="p-8">
                   <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
                   <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8 font-medium">
                      <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-900 font-bold">{avgRating === 0 ? null : avgRating}</span> {totalRating === 0 ? "Not rated" : `(${reviews?.length} ratings)`}
                      </span>
                      <span className="flex items-center gap-1"><span className="text-orange-500">📍</span> {address}</span>
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                       <div className="flex flex-col"><span className="text-gray-400 text-xs uppercase font-bold">City</span><span className="font-semibold">{city}</span></div>
                       <div className="flex flex-col"><span className="text-gray-400 text-xs uppercase font-bold">Price</span><span className="font-semibold">${price} / p</span></div>
                       <div className="flex flex-col"><span className="text-gray-400 text-xs uppercase font-bold">Distance</span><span className="font-semibold">{distance} k/m</span></div>
                       <div className="flex flex-col"><span className="text-gray-400 text-xs uppercase font-bold">People limit</span><span className="font-semibold">{maxGroupSize}</span></div>
                   </div>
                   <div className="pt-8 border-t border-gray-100">
                     <h2 className="text-2xl font-bold mb-4">Description</h2>
                     <p className="text-gray-600 leading-relaxed">{desc}</p>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-bold mb-6">Reviews ({reviews?.length || 0})</h3>
                {reviews?.length === 0 ? (
                  <p className="text-gray-500">No reviews yet.</p>
                ) : (
                  <div className="space-y-6">
                    {reviews?.map((review, i) => (
                      <div key={review._id || i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                         <div className="flex justify-between items-start mb-2">
                           <h5 className="font-bold text-gray-900">{review.username || "Anonymous"}</h5>
                           <span className="bg-orange-100 text-orange-600 font-bold px-2 py-1 rounded text-sm">{review.rating} ★</span>
                         </div>
                         <p className="text-gray-600">{review.reviewText}</p>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-8 sticky top-24">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                  <h3 className="text-3xl font-bold text-gray-900">${price} <span className="text-lg text-gray-400 font-medium">/per person</span></h3>
                </div>
                
                <form className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition" placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition" placeholder="+1 234 567 89" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                      <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Guests</label>
                      <input type="number" min="1" max="10" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition" placeholder="1" required />
                    </div>
                  </div>
                </form>

                <div className="space-y-3 pt-6 border-t border-gray-100 mb-6 font-medium text-gray-600">
                   <div className="flex justify-between">
                     <span>${price} x 1 person</span>
                     <span>${price}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Service Charge</span>
                     <span>$10</span>
                   </div>
                   <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                     <span>Total</span>
                     <span>${price + 10}</span>
                   </div>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-xl transition-all duration-300">
                   Book Tour Now
                </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TourDetails;
