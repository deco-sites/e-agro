import type { Product } from "apps/commerce/types.ts";
import Title from "site/components/Title.tsx";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  title: string;
  products: Product[] | null;
}

export default function ProductShelf({ products, title }: Props) {
  if (!products?.length) return null;

  return (
    <div class="flex flex-col gap-5 container max-lg:px-4">
      <Title title={title} />

      <ProductSlider
        products={Array(3).fill(products).flat()}
        itemListName={title}
      />
    </div>
  );
}
export const LoadingFallback = ({ title }: Props) => (
  <Section.Container>
    <Title title={title} />
    <Section.Placeholder height="471px" />
  </Section.Container>
);
