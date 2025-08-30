import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoPersonAddSharp, IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "../store/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white border-b-1">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-[10vh]">
        <img src="./logo.svg" alt="Logo" className='w-30 h-20 sm:h-12' />

        <ul className="hidden md:flex gap-6 text-xl">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/createrecipe">Create Recipe</Link></li>
          <li><Link to="/myrecipe">My Recipe</Link></li>
        </ul>

        <div className="hidden md:flex gap-4 items-center">
          <IoPersonAddSharp
            className='text-2xl'
            onClick={() => dispatch(signOut())}
          />
          <p>{user}</p>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoCloseSharp /> : <IoMenuSharp />}
        </button>
      </div>

      <div
        className={`md:hidden transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
      >
        <ul className="bg-white w-2/3 h-screen px-8 py-10 space-y-6">
          <li><Link className="block text-2xl" to="/">Home</Link></li>
          <li><Link className="block text-2xl" to="/createrecipe">Create Recipe</Link></li>
          <li><Link className="block text-2xl" to="/myrecipe">My Recipe</Link></li>
          <li className="flex items-center gap-2 pt-4">
            <IoPersonAddSharp
              className='text-2xl'
              onClick={() => dispatch(signOut())}
            />
            <p className="text-2xl">{user}</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;