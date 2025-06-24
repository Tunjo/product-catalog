import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

const product = {
  id: 1,
  name: "Test Product",
  description: "A test product for testing.",
  price: 19.99,
  imageUrl: "https://via.placeholder.com/150",
  category: { id: 1, name: "Test Category" },
  quantity: 10,
};

describe("ProductCard", () => {
  it("renders product name, price, and image", () => {
    render(
      <ProductCard
        product={product}
        onAddToCart={() => {}}
        onShowDetails={() => {}}
      />
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  it("calls onAddToCart when Add to Cart button is clicked", () => {
    const onAddToCart = jest.fn();
    render(
      <ProductCard
        product={product}
        onAddToCart={onAddToCart}
        onShowDetails={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });

  it("calls onShowDetails when product image is clicked", () => {
    const onShowDetails = jest.fn();
    render(
      <ProductCard
        product={product}
        onAddToCart={() => {}}
        onShowDetails={onShowDetails}
      />
    );
    fireEvent.click(screen.getByAltText("Test Product"));
    expect(onShowDetails).toHaveBeenCalledWith(product);
  });
});
