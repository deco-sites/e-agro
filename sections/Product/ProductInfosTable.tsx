import { clx } from "../../sdk/clx.ts";
import Section from "../../components/ui/Section.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const ProductInfosTable = ({ page }: Props) => {
  if (!page?.product) return null;

  return (
    <div class="container py-4 sm:py-5 px-5 sm:px-0">
      <div
        tabindex={0}
        class="collapse collapse-arrow border border-solid border-[#0c881e] rounded-lg"
      >
        <input type="checkbox" checked />
        <div class="collapse-title text-xl font-medium bg-[#f7f7f7] after:text-[#0c881e]">
          <h2 class="text-lg font-semibold ">Características técnicas</h2>
        </div>
        <div class="collapse-content">
          <div class="pt-4 grid grid-cols-1 sm:grid-cols-2">
            {page.product.additionalProperty
              ?.filter((i) =>
                !["Categoria", "Somente com preço"].includes(i.name ?? "")
              )
              .map((property, index) => (
                <div
                  class={clx(
                    "p-4 grid grid-cols-2 ",
                    Math.floor(index / 2) % 2 === 0 ? "sm:!bg-[#f7f7f7]" : "",
                    (index + 1) % 2 !== 0
                      ? "rounded-s-lg bg-[#f7f7f7] sm:bg-white"
                      : "rounded-e-lg",
                  )}
                >
                  <span>{property.name}</span>
                  <span class="font-semibold">{property.value}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfosTable;

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
