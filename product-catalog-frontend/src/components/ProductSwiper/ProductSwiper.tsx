import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Product } from "../../shared/interfaces/product";
import ProductCard from "../ProductCard/ProductCard";

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onShowDetails: (product: Product) => void;
};

export default function ProductSwiper({
  products,
  onAddToCart,
  onShowDetails,
}: Props) {
  if (products.length <= 3) {
    return (
      <div className="w-full max-w-7xl mx-auto flex justify-center">
        <div className="flex flex-row gap-8 justify-center w-full">
          {products.map((product) => (
            <div key={product.id} className="w-[350px] flex flex-col">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onShowDetails={onShowDetails}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Swiper
        modules={[Navigation]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={40}
        slidesPerView={3}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="h-full flex justify-center">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onShowDetails={onShowDetails}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
