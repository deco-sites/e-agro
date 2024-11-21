import type { Product } from "apps/commerce/types.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";

interface Props {
  products: Product[];
  itemListName?: string;
}

function ProductSlider({ products, itemListName }: Props) {
  const id = useId();

  return (
    <>
      <div id={id}>
        <Slider class="carousel carousel-center gap-5 w-full">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item md:w-[calc(25%-20px+(20px/4))] lg:w-[calc(20%-20px+(20px/5))]"
            >
              <ProductCard
                index={index}
                product={product}
                itemListName={itemListName}
                class="w-[210px] lg:w-[220px]"
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class="hidden md:flex justify-center items-center gap-2 my-7">
          <Slider.PrevButton class="flex items-center justify-center text-black disabled:text-[#a7a8ac]">
            <Icon id="chevron-right" size={24} class="rotate-180" />
          </Slider.PrevButton>

          <div class="flex items-center gap-2">
            {products.map((_, index) => (
              <Slider.Dot
                index={index}
                class="bg-[#d8dcdd] disabled:bg-[#0c881e] transition-colors size-2 rounded-full"
              />
            ))}
          </div>

          <Slider.NextButton class="flex items-center justify-center text-black disabled:text-[#a7a8ac]">
            <Icon id="chevron-right" size={24} />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={id} />
    </>
  );
}

export default ProductSlider;
