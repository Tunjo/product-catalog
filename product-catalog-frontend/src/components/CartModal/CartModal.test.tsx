import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CartModal from "./CartModal";
import { CartItem, useCartStore } from "../../shared/store/cartStore";

// Mock PayPalButtons to avoid loading the real PayPal SDK in tests
jest.mock("@paypal/react-paypal-js", () => ({
  PayPalButtons: (props: any) => (
    <button
      onClick={() =>
        props.onApprove?.(
          {},
          {
            order: {
              capture: () =>
                Promise.resolve({ payer: { name: { given_name: "Test" } } }),
            },
          }
        )
      }
    >
      PayPal Pay
    </button>
  ),
}));

const mockCartItem = {
  product: {
    id: 1,
    name: "Test Product",
    price: 10,
    imageUrl: "https://via.placeholder.com/150",
    description: "A test product for testing.",
    category: { id: 1, name: "Test Category" },
    quantity: 10,
  },
  quantity: 1,
};

const setupCartStore = (items: CartItem[] = []) => {
  useCartStore.setState({
    items,
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
  });
};

describe("CartModal", () => {
  beforeEach(() => {
    setupCartStore([]);
  });

  it("renders empty cart message", () => {
    render(<CartModal open={true} onClose={jest.fn()} />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders cart items and total", () => {
    setupCartStore([mockCartItem]);
    render(<CartModal open={true} onClose={jest.fn()} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getAllByText("$10.00").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });

  it("calls removeFromCart when Remove button is clicked", () => {
    const removeFromCart = jest.fn();
    setupCartStore([mockCartItem]);
    useCartStore.setState({ removeFromCart });
    render(<CartModal open={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText(/remove/i));
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  it("shows PayPal button after Proceed to Payment is clicked", () => {
    setupCartStore([mockCartItem]);
    render(<CartModal open={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText(/proceed to payment/i));
    expect(screen.getByText(/PayPal Pay/i)).toBeInTheDocument();
  });

  it("shows success modal after payment", async () => {
    setupCartStore([mockCartItem]);
    render(<CartModal open={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText(/proceed to payment/i));
    fireEvent.click(screen.getByText(/PayPal Pay/i));
    await waitFor(() => {
      expect(screen.getByText(/payment successful/i)).toBeInTheDocument();
    });
  });
});
