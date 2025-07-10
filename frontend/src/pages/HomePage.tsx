import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api.ts";

const HomePage = () => {
  const [products, setProducts] = useState<{ id: string; name: string; category: string; price: string; image?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="homepage flex justify-center items-center h-screen bg-white">
        <div className="loader border-4 border-[#f34155] border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }
  

  if (error) {
    return (
      <div className="homepage">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <style>
        {
          `
          .product-name iframe{
            position: fixed;
            top: 0; 
            left: 0; 
            width: 100vw; 
            height: 100vh; 
            border: none; 
            z-index: 9999; 
            }
        `}
      </style>
      {/* Section Héros */}
      <div className="relative bg-white overflow-hidden flex flex-col lg:flex-row">
        <div className="md:w-3/5 w-full">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 lg:max-w-2xl lg:w-full mx-auto">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">La mode qui</span>{" "}
                  <span className="block text-[#f34155] xl:inline">
                    vous ressemble
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Découvrez nos nouvelles collections. Des pièces uniques pour
                  un style affirmé. Qualité, confort et design au rendez-vous.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#f34155] hover:bg-[#f34155] md:py-4 md:text-lg md:px-10"
                    >
                      Découvrir
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#f34155] bg-[#eaa9b3] md:py-4 md:text-lg md:px-10"
                    >
                      Promotions
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="md:w-2/5 w-full">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://placehold.co/1000x900/eaa9b3/f34155?text=Collection+Été"
            alt="Collection de vêtements"
          />
        </div>
      </div>

      {/* Section Produits Phares */}
      <div className="pt-24 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 text-center">
            Produits Phares
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={
                      product.image ??
                      `https://placehold.co/1000x800/eaa9b3/f34155?text=${product.name.split(" ")[0]}`
                    }
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/products/${product.id}`}>
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        <span className="product-name" dangerouslySetInnerHTML={{ __html: product.name }} />
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
