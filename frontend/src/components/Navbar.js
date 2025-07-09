import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Nouveautés', path: '/' },
    { name: 'Femme', path: '/' },
    { name: 'Homme', path: '/' },
    { name: 'Soldes', path: '/' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-wider">
              VULN SHOP
            </Link>
          </div>

          {/* Liens de navigation (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Icônes et Recherche (Desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher..."
                className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-48 focus:w-56 transition-all duration-300 outline-none text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Link to="/login" className="text-gray-500 hover:text-gray-900">
              <User size={24} />
            </Link>
            <Link to="/" className="relative text-gray-500 hover:text-gray-900">
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 bg-[#f34155] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </Link>
          </div>

          {/* Bouton Menu (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu déroulant (Mobile) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-5 mb-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Rechercher..."
                  className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-full outline-none text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center px-5">
              <Link to="/login" className="flex items-center text-gray-600 hover:text-gray-900">
                <User size={24} />
                <span className="ml-3 font-medium">Mon Compte</span>
              </Link>
            </div>
            <div className="mt-3 flex items-center px-5">
              <Link to="/" className="relative flex items-center text-gray-600 hover:text-gray-900">
                <ShoppingBag size={24} />
                <span className="ml-3 font-medium">Panier</span>
                <span className="ml-2 bg-[#f34155] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
