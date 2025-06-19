import { useEffect, useState } from "react";
import CartModal from "../components/CartModal/CartModal";
import CategorySelect from "../components/CategorySelect/CategorySelect";
import Header from "../components/Header/Header";
import ProductSwiper from "../components/ProductSwiper/ProductSwiper";
import { Product } from "../shared/interfaces/product";
import { useCartStore } from "../shared/store/cartStore";
import { useProductStore } from "../shared/store/productStore";
import ProductDetailModal from "../components/ProductDetailModal/ProductDeatilModal";

export default function Home() {
  const {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories,
  } = useProductStore();
  const addToCart = useCartStore((s) => s.addToCart);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [fetchProducts, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleShowDetails = (product: Product) => {
    setModalProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <Header onCartClick={() => setCartOpen(true)} />
      <main className="max-w-7xl mx-auto py-8 px-2">
        <div className="flex justify-center mb-10">
          <CategorySelect
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
        <div className="rounded-3xl shadow-2xl bg-white/80 p-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <ProductSwiper
              products={products}
              onAddToCart={handleAddToCart}
              onShowDetails={handleShowDetails}
            />
          )}
        </div>
      </main>
      <ProductDetailModal
        product={modalProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
