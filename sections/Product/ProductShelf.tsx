import type { Product } from "apps/commerce/types.ts";
import Title from "site/components/Title.tsx";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  /** @title Título */
  title: string;
  /** @title Produtos */
  products: Product[] | null;
  /**
   * @title Estilo do Título
   * @default blue
   */
  titleVariant?: "blue" | "black";
}

export default function ProductShelf({ products, title, titleVariant }: Props) {
  if (!products?.length) return null;

  return (
    <div class="flex flex-col gap-5 container max-lg:px-4 mb-6">
      <Title title={title} variant={titleVariant} />

      <ProductSlider
        products={Array(3).fill(products).flat()}
        itemListName={title}
      />
    </div>
  );
}
export const LoadingFallback = ({ title }: Props) => (
  <div class="flex flex-col gap-5 container max-lg:px-4">
    <Title title={title} />
    <Section.Placeholder height="440px" />
  </div>
);
