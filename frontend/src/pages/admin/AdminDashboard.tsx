import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct, getUsers } from '../../api.ts';

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<{ id: number; username: string }[]>([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [message, setMessage] = useState('');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const userList = await getUsers();
          setUsers(userList);
        } catch (err) {
          // setError("Erreur lors du chargement des produits");
          console.error("Error fetching users:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Accès refusé</h2>
        <p className="text-gray-700 mb-4">Vous devez être connecté en tant qu'administrateur.</p>
        <Link
          to="/login"
          className="inline-block bg-[#f34155] hover:bg-[#f34155] text-white px-4 py-2 rounded-md"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleSubmitProduct = async (e: any) => {
    e.preventDefault();

    if (!productName || !productPrice) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    const response = await addProduct({ name: productName, price: productPrice });
    if (response.success) {
      setMessage(`✅ Produit "${productName}" ajouté avec succès !`);
      setProductName('');
      setProductPrice('');
    } else {
      setMessage('❌ Erreur lors de l\'ajout du produit.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Console d'Administration</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Se déconnecter
        </button>
      </div>

      {/* Ajouter un produit */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ajouter un produit</h2>
        <form onSubmit={handleSubmitProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prix</label>
            <input
              type="number"
              step="0.01"
              className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-[#f34155] hover:bg-[#f34155] text-white px-6 py-2 rounded-md"
          >
            Ajouter le produit
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
        )}
      </div>

      <hr />

      {/* Voir un utilisateur */}
      <div className='mt-8'>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Consulter un utilisateur</h2>
        <p className="text-gray-600 mb-3">Accédez aux informations des utilisateurs :</p>
        <ul className="list-disc list-inside space-y-1">
          {users.map((user) => (
              <li key={user.id}>
                <Link 
                  to={`#`} 
                  className="text-[#f34155] hover:underline"
                >
                  Voir utilisateur {user.username} ({user.id})
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
