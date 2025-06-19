export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: Category;
  quantity: number;
}
