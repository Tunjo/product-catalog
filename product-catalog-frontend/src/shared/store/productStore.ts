import { create } from "zustand";
import axios from "axios";
import { Category, Product } from "../interfaces/product";

interface ProductState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchProducts: (category?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

const API_URL = process.env.REACT_APP_API_URL;

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,

  fetchProducts: async (category) => {
    set({ loading: true, error: null });
    try {
      const url =
        !category || category === "All"
          ? `${API_URL}/api/products`
          : `${API_URL}/api/products/filter?category=${encodeURIComponent(
              category
            )}`;
      const res = await axios.get<Product[]>(url);
      set({ products: res.data });
    } catch (err) {
      set({ error: "Failed to load products" });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const res = await axios.get<Category[]>(`${API_URL}/api/categories`);
      set({ categories: res.data });
    } catch {
      set({ categories: [] });
    }
  },
}));
