import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
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

  const [showPayPal, setShowPayPal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleClose = () => {
    setShowPayPal(false);
    setPaymentSuccess(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl min-w-[350px] min-h-[400px] w-full p-10 relative animate-dropdown flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost transition-transform duration-150 hover:scale-125"
          onClick={handleClose}
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
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="negative"
                      size="sm"
                      className="w-auto"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-green-700">${total.toFixed(2)}</span>
              </div>
              {!showPayPal && !paymentSuccess && (
                <>
                  <Button
                    variant="positive"
                    size="full"
                    onClick={() => setShowPayPal(true)}
                  >
                    Proceed to Payment
                  </Button>
                  <Button variant="negative" size="full" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </>
              )}
              {showPayPal && !paymentSuccess && (
                <div className="mt-4">
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data: any, actions: any) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "EUR", // or "USD" - match your PayPalScriptProvider
                              value: total.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data: any, actions: any) => {
                      if (actions && actions.order) {
                        await actions.order.capture();
                        setPaymentSuccess(true);
                      }
                    }}
                    onCancel={() => setShowPayPal(false)}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {paymentSuccess && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Payment Successful!
              </h2>
              <p className="mb-6">Thank you for your order.</p>
              <Button
                variant="negative"
                size="full"
                onClick={() => {
                  setPaymentSuccess(false);
                  setShowPayPal(false);
                  clearCart();
                  handleClose();
                }}
              >
                Close
              </Button>
            </div>
          </div>
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
