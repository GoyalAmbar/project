import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // Fetch only this user's bookings (using filtering or custom endpoint, assuming custom endpoint or filtering on all)
  const { data: bookings, loading, error } = useFetch(`${BASE_URL}/bookings`); // The backend needs proper setup or we filter locally for the mock

  const userBookings = bookings?.filter(b => b.userId === user._id) || [];

  return (
    <section className="py-12 bg-gray-50 min-h-[70vh]">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-8">My Dashboard</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
           <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
             <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl font-bold uppercase">
               {user.username.charAt(0)}
             </div>
             <div>
               <h3 className="text-2xl font-bold">{user.username}</h3>
               <p className="text-gray-500">{user.email}</p>
             </div>
           </div>

           <h4 className="text-xl font-bold mb-6">My Bookings</h4>
           
           {loading && <p>Loading bookings...</p>}
           {error && <p className="text-red-500">{error}</p>}
           
           {!loading && !error && userBookings.length === 0 && (
             <div className="text-center py-10 bg-gray-50 rounded-xl">
               <p className="text-gray-500">You haven't booked any tours yet.</p>
             </div>
           )}

           {!loading && !error && userBookings.length > 0 && (
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                     <th className="p-4 rounded-tl-lg font-semibold">Tour Name</th>
                     <th className="p-4 font-semibold">Date</th>
                     <th className="p-4 font-semibold">Guests</th>
                     <th className="p-4 font-semibold">Price</th>
                     <th className="p-4 rounded-tr-lg font-semibold">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {userBookings.map(booking => (
                     <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                       <td className="p-4 font-medium">{booking.tourName}</td>
                       <td className="p-4 text-gray-600">{new Date(booking.bookAt).toLocaleDateString()}</td>
                       <td className="p-4 text-gray-600">{booking.guestSize}</td>
                       <td className="p-4 font-medium text-orange-500">${booking.price}</td>
                       <td className="p-4">
                         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                           {booking.status || 'Success'}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
