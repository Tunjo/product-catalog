import { render, screen, fireEvent } from "@testing-library/react";
import CategorySelect from "./CategorySelect";

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Books" },
  { id: 3, name: "Clothing" },
];

describe("CategorySelect", () => {
  it("renders default option and shows categories when opened", () => {
    render(
      <CategorySelect categories={categories} value="" onChange={jest.fn()} />
    );
    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /all/i }));

    // Now the options should be visible
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(screen.getByText("Clothing")).toBeInTheDocument();
  });

  it("calls onChange with selected category name", () => {
    const onChange = jest.fn();
    render(
      <CategorySelect categories={categories} value="" onChange={onChange} />
    );
    fireEvent.click(screen.getByRole("button", { name: /all/i }));
    fireEvent.click(screen.getByText("Books"));
    expect(onChange).toHaveBeenCalledWith("Books");
  });

  it("shows selected category as button label", () => {
    render(
      <CategorySelect
        categories={categories}
        value="Clothing"
        onChange={jest.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: /clothing/i })
    ).toBeInTheDocument();
  });
});
