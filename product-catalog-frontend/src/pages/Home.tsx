import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../componenets/ProductCard/ProductCard";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: Category;
  quantity: number;
};

const API_URL = process.env.REACT_APP_API_URL;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Category[]>(`${API_URL}/api/categories`)
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url =
      selectedCategory === "All"
        ? `${API_URL}/api/products`
        : `${API_URL}/api/products/filter?category=${encodeURIComponent(
            selectedCategory
          )}`;
    axios
      .get<Product[]>(url)
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        Product Catalog
      </h1>
      <div className="flex justify-center mb-8">
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
