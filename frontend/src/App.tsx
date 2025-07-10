import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import ViewUser from "./pages/admin/ViewUser";
import PrivateRoute from "./guards/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="bg-gray-50 min-h-[80vh] font-sans">
      <Navbar />
      <main className=" min-h-[80vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/users/:id" element={<PrivateRoute><ViewUser /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <Link
                to="/"
                className="text-3xl font-bold text-white tracking-wider"
              >
                VULN SHOP
              </Link>
              <p className="text-gray-400 text-base">
                La mode qui vous ressemble. Collections exclusives et pièces de
                qualité.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    Solutions
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-white"
                      >
                        Marketing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-white"
                      >
                        Analytics
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-white"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-white"
                      >
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    Compagnie
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-white"
                      >
                        À propos
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-white"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    Légal
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-white"
                      >
                        Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-white"
                      >
                        Confidentialité
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2024 VULN SHOP, Inc. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
