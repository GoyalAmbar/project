import React from 'react';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

const AdminDashboard = () => {
  const { data: tours, loading: tLoad } = useFetch(`${BASE_URL}/tours?page=0`);
  const { data: bookings, loading: bLoad } = useFetch(`${BASE_URL}/bookings`);

  return (
    <section className="py-12 bg-gray-50 min-h-[70vh]">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-indigo-900">Admin Control Panel</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold">Manage Tours</h4>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition">Add New</button>
            </div>
            {tLoad ? <p>Loading...</p> : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {tours?.map(tour => (
                  <div key={tour._id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                    <div>
                      <h5 className="font-bold line-clamp-1">{tour.title}</h5>
                      <span className="text-sm text-gray-500">${tour.price}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-500 font-medium text-sm">Edit</button>
                      <button className="text-red-500 font-medium text-sm">Del</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold">All Bookings</h4>
            </div>
            {bLoad ? <p>Loading...</p> : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {bookings?.map(booking => (
                  <div key={booking._id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                    <div>
                      <h5 className="font-bold">{booking.fullName}</h5>
                      <span className="text-sm text-gray-500">{booking.tourName}</span>
                    </div>
                    <div className="text-right">
                       <div className="font-bold text-orange-500">${booking.price}</div>
                       <div className="text-xs text-gray-400">{new Date(booking.bookAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
