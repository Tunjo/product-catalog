import { Product } from "../../shared/interfaces/product";
import Button from "../Button/Button";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  open,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!open || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl min-w-[350px] min-h-[400px] w-full p-10 relative animate-dropdown"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost transition-transform duration-150 hover:scale-125"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <span className="badge badge-secondary mb-3">
          {product.category.name}
        </span>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>
          <div className="flex gap-2">
            <Button
              variant="negative"
              size="sm"
              className="w-auto"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="positive"
              size="sm"
              className="w-auto"
              onClick={() => onAddToCart?.(product)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes dropdown {
            0% { opacity: 0; transform: translateY(-20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-dropdown {
            animation: dropdown 0.18s ease;
          }
        `}
      </style>
    </div>
  );
}
