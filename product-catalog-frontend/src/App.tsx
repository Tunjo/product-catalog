import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 drop-shadow">
          🛒 Product Catalog
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Discover and shop from our curated selection of products. Filter by
          category, add to your cart, and enjoy a seamless shopping experience!
        </p>
        <Button className="px-8 py-4 text-lg font-semibold shadow-md hover:scale-105 transition-transform">
          Shop Now
        </Button>
      </div>
    </div>
  );
}

export default App;
