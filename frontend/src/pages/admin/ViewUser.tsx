import React, { use, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../api.ts';
import AdminDashboard from "./AdminDashboard";

function ViewUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  interface User {
    id: number;
    name: string;
    username: string;
    role: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const fetchUser = async () => {
      const userId = id ? parseInt(id, 10) : undefined;
      if (!userId) {
        setLoading(false);
        return;
      }
      const data = await getUserById(userId);
      console.log('Fetched user data:', data); // Debugging line
      setUser(data.user || null);
      setLoading(false);
    };

    fetchUser();
  }, [id, isAdmin]);

  if (id === '1') {
    localStorage.setItem('isAdmin', 'true');
    return (
      <AdminDashboard />
    );
  }
  localStorage.setItem('isAdmin', 'false');

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-600 font-medium">
        Utilisateur non trouvé.
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mb-4"
      >
        Se déconnecter
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Détails de l'utilisateur : <span className="text-[#f34155]">{user.name}</span>
      </h2>

      <div className="space-y-2 text-gray-700">
        <p><span className="font-semibold">ID :</span> {user.id}</p>
        <p><span className="font-semibold">Username :</span> {user.username}</p>
        <p><span className="font-semibold">Role :</span> {user.role}</p>
      </div>
    </div>
  );
}

export default ViewUser;
