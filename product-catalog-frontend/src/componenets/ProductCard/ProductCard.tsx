type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: Category;
};

export default function ProductCard({ product }: { product: Product }) {
  console.log(product);
  return (
    <div className="card bg-base-100 shadow-md border rounded-xl overflow-hidden">
      <figure>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-primary font-bold mb-2">${product.price}</p>
        <p className="text-gray-600 mb-4">
          {product.description.length > 100
            ? product.description.slice(0, 100) + "…"
            : product.description}
        </p>
        <button className="btn btn-primary w-full">Add to Cart</button>
      </div>
    </div>
  );
}
