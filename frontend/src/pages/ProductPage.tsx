import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getComments, addComment } from '../api.ts';

// Define the Product type
type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
};

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<{ author: string; content: string }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [xssEnabled, setXssEnabled] = useState(false); // 🧪 Toggle XSS

  const fetchComments = async () => {
    const fetched = await getComments(Number(id));
    setComments(fetched.data || []);
  };

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await getProducts();
      const foundProduct = allProducts.find((p: Product) => String(p.id) === id);
      setProduct(foundProduct || null);
      await fetchComments();
    };

    fetchData();
  }, [id]);

  const escapeHTML = (str: string): string => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const handleCommentSubmit = async (e:any) => {
    e.preventDefault();
    const cleanText = xssEnabled
      ? newComment.trim()
      : escapeHTML(newComment.trim());

    if (!cleanText) return;

    const author = localStorage.getItem('accessToken') ? localStorage.getItem('username') || 'Visiteur' : 'Visiteur';

    const newCommentObj = {
      productId: Number(id),
      author: author,
      content: cleanText,
    };

    const response = await addComment(newCommentObj, Number(id));
    console.log('Comment response:', response); // Debugging line
    if (response?.success) {
      setNewComment('');
      await fetchComments();
    }
  };

  if (!product) {
    return <div className="p-4 text-center">Produit introuvable.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 🧪 Toggle XSS */}
      <div className="mb-6 text-right">
        <label className="inline-flex items-center cursor-pointer">
          <span className="mr-2 text-sm font-medium text-gray-700">XSS mode</span>
          <input
            type="checkbox"
            checked={xssEnabled}
            onChange={() => setXssEnabled(!xssEnabled)}
            className="toggle toggle-sm toggle-success"
          />
        </label>
      </div>

      <img
        src={
          product.image ??
          `https://placehold.co/1000x200/eaa9b3/f34155?text=${product.name.split(" ")[0]}`
        }
        alt={product.name}
        className="w-full max-w-md mb-6 rounded-md"
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-2">{product.description}</p>
      <p className="text-xl font-semibold text-[#f34155] mb-4">{product.price}</p>

      <button className="bg-[#f34155] text-white px-6 py-2 rounded hover:bg-[#f34155] transition-colors">
        Ajouter au panier
      </button>

      <hr className="mt-10" />

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Commentaires</h2>
        {comments.length > 0 ? (
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded">
                <strong>{comment.author}:</strong>{' '}
                {xssEnabled ? (
                  <span dangerouslySetInnerHTML={{ __html: comment.content }} />
                ) : (
                  <span>{comment.content}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun commentaire pour ce produit.</p>
        )}

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            placeholder="Laissez un commentaire..."
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductPage;
