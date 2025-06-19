import { useCartStore } from "../../shared/store/cartStore";

export default function Header({ onCartClick }: { onCartClick: () => void }) {
  const items = useCartStore((s) => s.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4 mb-8">
      <h1 className="text-2xl font-bold text-primary">Product Catalog</h1>
      <button
        className="relative btn btn-ghost btn-circle hover:bg-green-100 group"
        onClick={onCartClick}
        aria-label="Open cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-primary group-hover:text-green-700 transition-colors"
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
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {totalCount}
          </span>
        )}
      </button>
    </header>
  );
}
