import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import SeeMore from "../ui/SeeMore.tsx";
import Icon from "../ui/Icon.tsx";
import { useDevice, useScript } from "@deco/deco/hooks";

interface Props {
  page: ProductDetailsPage | null;
}

const showWhenScroll = (id: string, device: string) => {
  const scrollThreshold = device !== "mobile" ? 500 : 300;

  const handleScroll = () => {
    const element = document.getElementById(id);
    if (!element) return;

    if (window.scrollY > scrollThreshold) {
      element.classList.remove("translate-y-full");
    } else {
      element.classList.add("translate-y-full");
    }
  };

  // Add scroll listener
  addEventListener("scroll", handleScroll);
};

function ProductInfo({ page }: Props) {
  const device = useDevice();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf } = product;
  const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;

  const { price = 0, listPrice, seller = "1", availability } = useOffer(offers);

  // const percent = listPrice && price
  //   ? Math.round(((listPrice - price) / listPrice) * 100)
  //   : 0;

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  const installmentQuantity = Math.min(12, Math.floor(price / 10));
  const installmentValue = Math.ceil(price / installmentQuantity);

  //Checks if the variant name is "title"/"default title" and if so, the SKU Selector div doesn't render
  const hasValidVariants = isVariantOf?.hasVariant?.some(
    (variant) =>
      variant?.name?.toLowerCase() !== "title" &&
      variant?.name?.toLowerCase() !== "default title",
  ) ?? false;

  return (
    <div {...viewItemEvent} class="flex flex-col" id={id}>
      {/* Product Name */}
      <span class={clx("text-2xl")}>{title}</span>

      <SeeMore maxHeight={48}>
        {description && (
          <div
            class="mt-2 text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </SeeMore>

      {/* Prices */}
      <div class="flex gap-3 pt-1 ">
        <span class="text-3xl font-semibold text-base-400">
          {formatPrice(price, offers?.priceCurrency)}
        </span>
        <span class="line-through text-sm font-medium text-gray-400">
          {formatPrice(listPrice, offers?.priceCurrency)}
        </span>
      </div>
      <div class="mt-4 border-b border-solid border-[#d9dcdd]"></div>

      {/* Sku Selector */}
      {hasValidVariants && (
        <div class="mt-4 sm:mt-8">
          <ProductSelector product={product} />
        </div>
      )}

      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <AddToCartButton
              item={item}
              seller={seller}
              product={product}
              class="btn no-animation border-primary text-primary"
              disabled={false}
            />
          )
          : <OutOfStock productID={productID} />}
      </div>

      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulationForm
          items={[{ id: Number(product.sku), quantity: 1, seller: seller }]}
        />
      </div>

      <div class="mt-4 border border-solid border-[#d9dcdd] p-4 gap-4 flex flex-col">
        <h2 class="text-sm font-semibold sm:text-center text-[#008aeb] leading-6">
          Meios de pagamento
        </h2>
        <ul class="flex flex-col sm:flex-row gap-4 sm:gap-7 justify-center">
          <li>
            <span>
              <Icon id="card" size={16} class="inline-block mr-2" />
              <span class="text-black text-sm font-semibold">
                Cartão de crédito
              </span>{" "}
              <span class="text-xs text-[#6d6e71]">
                até {installmentQuantity}x de {formatPrice(installmentValue)}
              </span>
            </span>
          </li>
          <li>
            <span>
              <Icon id="pix" size={16} class="inline-block mr-2" />
              <span class="text-black text-sm font-semibold">Pix</span>
            </span>
          </li>
          <li>
            <span>
              <Icon id="bars" size={16} class="inline-block mr-2" />
              <span class="text-black text-sm font-semibold">Boleto</span>
            </span>
          </li>
        </ul>
      </div>

      <div class="mt-4  border border-solid border-[#d9dcdd] p-4 flex items-center justify-between rounded-lg">
        <p class="text-sm color-[#6d6e71]">Compartilhe</p>
        <div class="flex gap-5">
          <a
            class="sc-lnrzcU hbYHKt"
            title="Compartilhar no WhatsApp"
            href={`https://wa.me/?text=Olá, achei essa oferta interessante e gostaria de compartilhar! ${product.url}`}
            target="_blank"
          >
            <img
              src="data:image/png;base64,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"
              alt="Whats App"
              title="Whats App"
              class="w-4"
            />
          </a>
          <a
            class="sc-lnrzcU hbYHKt"
            title="Compartilhar no Facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${product.url}`}
            target="_blank"
          >
            <img
              src="data:image/png;base64,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"
              alt="Facebook"
              title="Facebook"
              class="w-4"
            />
          </a>
          <div class="sc-hhwoEC flLHtS">
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z">
              </path>
              <path d="M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z">
              </path>
            </svg>
          </div>
        </div>
      </div>

      <div class="mt-4  text-[#6d6e71] text-sm">Ref.: {product.gtin}</div>
      <div class="mt-4 ">
        <span>
          <Icon id="verified-seal" size={20} class="inline mr-2" />
          Vendido por{" "}
          <a href="" class="text-[#0c881e] font-semibold">
            {product.offers?.offers[0].sellerName} →
          </a>
        </span>
      </div>
      <div
        id={`${id}-fixed-bottom-section`}
        class="fixed translate-y-full bg-white shadow-[#00000026_0px_-5px_10px] left-0 right-0 bottom-0 z-50 transition"
      >
        <div class="container p-4 sm:py-4 sm:px-8 flex flex-col sm:flex-row justify-between">
          <div class="flex flex-col">
            <div class={clx("text-base sm:text-xl")}>{title}</div>
            <div class="text-xl sm:text-2xl font-semibold text-base-400">
              {formatPrice(price, offers?.priceCurrency)}
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            showWhenScroll,
            `${id}-fixed-bottom-section`,
            device,
          ),
        }}
      />
    </div>
  );
}

export default ProductInfo;
