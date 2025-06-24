import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetailModal from "./ProductDetailModal";

const product = {
  id: 1,
  name: "Test Product",
  description: "A test product for testing.",
  price: 19.99,
  imageUrl: "https://via.placeholder.com/150",
  category: { id: 1, name: "Test Category" },
  quantity: 10,
};

describe("ProductDetailModal", () => {
  it("renders product details when open", () => {
    render(
      <ProductDetailModal
        open={true}
        product={product}
        onClose={jest.fn()}
        onAddToCart={jest.fn()}
      />
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("A test product for testing.")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <ProductDetailModal
        open={false}
        product={product}
        onClose={jest.fn()}
        onAddToCart={jest.fn()}
      />
    );
    expect(screen.queryByText("Test Product")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <ProductDetailModal
        open={true}
        product={product}
        onClose={onClose}
        onAddToCart={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onAddToCart when Add to Cart button is clicked", () => {
    const onAddToCart = jest.fn();
    render(
      <ProductDetailModal
        open={true}
        product={product}
        onClose={jest.fn()}
        onAddToCart={onAddToCart}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });
});
