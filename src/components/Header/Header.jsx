import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-black text-orange-500">
          <Link to="/">WanderlustBooking</Link>
        </div>
        
        <nav className="hidden md:flex gap-6 font-medium text-gray-700">
          <Link to="/home" className="hover:text-orange-500 transition">Home</Link>
          <Link to="/tours" className="hover:text-orange-500 transition">Tours</Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <h5 className="font-semibold text-gray-800">Hi, {user.username}</h5>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full font-medium hover:bg-orange-600 transition" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium text-gray-800 hover:text-orange-500 transition">Login</Link>
              <Link to="/register" className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
