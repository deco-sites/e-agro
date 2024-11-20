import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div class="container flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5 sm:px-0">
      <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />

      <div
        class={clx(
          "container grid",
          "grid-cols-1 py-0 gap-2",
          "sm:grid-cols-2 sm:gap-24",
        )}
      >
        <div class="">
          <ImageGallerySlider page={page} />
          <div>
            <h2 class="text-2xl font-semibold text-black">
              Descrição do produto
              <span class="bg-[#35c537] w-[18px] h-[18px] inline-block ml-1 rounded-[18px_0]">
              </span>
            </h2>
            <div
              class="mt-2 text-sm leading-6"
              dangerouslySetInnerHTML={{
                __html: page.product.description ?? "",
              }}
            />
          </div>
        </div>
        <div class="">
          <ProductInfo page={page} />
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
