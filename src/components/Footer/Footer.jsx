import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">WanderlustBooking</h2>
          <p className="text-sm">Your gateway to the world's most breathtaking tours and destinations. Book your dream vacation with ease and security.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/home" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="/tours" className="hover:text-orange-500 transition">All Tours</a></li>
            <li><a href="/login" className="hover:text-orange-500 transition">Login</a></li>
            <li><a href="/register" className="hover:text-orange-500 transition">Register</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@wanderlustbooking.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Location: San Francisco, CA</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-10 pt-6 border-t border-gray-800 text-sm">
        <p>&copy; {new Date().getFullYear()} WanderlustBooking. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
