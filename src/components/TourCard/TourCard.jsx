import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;

  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
  const avgRating =
    totalRating === 0
      ? ''
      : totalRating === 1
      ? totalRating
      : (totalRating / reviews?.length).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={photo || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt="tour-img" className="w-full h-48 object-cover" />
        {featured && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {city}
          </span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {avgRating === 0 ? null : avgRating} {totalRating === 0 ? "Not rated" : `(${reviews?.length})`}
          </span>
        </div>
        <h5 className="text-xl font-bold mb-3 text-gray-800 hover:text-orange-500 transition line-clamp-1">
          <Link to={`/tours/${_id}`}>{title}</Link>
        </h5>
        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
          <h5 className="text-lg font-bold text-orange-500">${price} <span className="text-sm text-gray-400 font-medium">/per person</span></h5>
          <Link to={`/tours/${_id}`}>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
