import { useCartStore } from "../../shared/store/cartStore";
import Button from "../Button/Button";

export default function CartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl min-w-[350px] min-h-[400px] w-full p-10 relative animate-dropdown flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost transition-transform duration-150 hover:scale-125"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {items.length === 0 ? (
          <p className="text-gray-500 flex-1 flex items-center justify-center">
            Your cart is empty.
          </p>
        ) : (
          <>
            <ul className="divide-y flex-1">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <span className="font-semibold">{product.name}</span>
                    <span className="ml-2 text-gray-500">x{quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">
                      ${product.price * quantity}
                    </span>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-green-700">${total.toFixed(2)}</span>
              </div>
              <Button
                variant="positive"
                onClick={() => alert("Proceeding to payment...")}
              >
                Proceed to Payment
              </Button>
              <Button variant="negative" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
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
