import { Product } from "../../shared/interfaces/product";
import Button from "../Button/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onShowDetails?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onShowDetails,
}: ProductCardProps) {
  // Handler for opening details
  const handleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowDetails?.(product);
  };

  return (
    <div className="card w-full h-full flex flex-col bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200">
      <figure
        className="bg-base-200 w-full cursor-pointer"
        onClick={handleDetails}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl"
        />
      </figure>
      <div className="card-body flex flex-col gap-2 p-6 flex-1">
        <h2
          className="card-title text-xl font-semibold text-primary mb-1 cursor-pointer"
          onClick={handleDetails}
        >
          {product.name}
        </h2>
        <span
          className="badge badge-secondary mb-2 self-start cursor-pointer"
          onClick={handleDetails}
        >
          {product.category.name}
        </span>
        <p
          className="text-gray-700 text-sm mb-2 px-2 py-1 bg-gray-50 rounded cursor-pointer"
          onClick={handleDetails}
        >
          {product.description.length > 100
            ? product.description.slice(0, 100) + "…"
            : product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-circle hover:bg-green-100 group"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              title="Add to cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary group-hover:text-green-700 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.9-1.45L17 13M7 13V6h10v7"
                />
              </svg>
            </button>
            <Button
              variant="positive"
              size="sm"
              className="w-auto"
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails?.(product);
              }}
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
