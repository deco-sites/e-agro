import type { BreadcrumbList } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import { clx } from "site/sdk/clx.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  isProductListingPage?: boolean;
}

function Breadcrumb({
  itemListElement = [],
  isProductListingPage = false,
}: Props) {
  const items = [{ name: "Loja e-agro", item: "/" }, ...itemListElement];
  const lastItem = items.at(-1);
  const isSearchResultPage = lastItem?.item?.includes("/s?q=");

  return (
    <div class="w-full flex flex-col gap-[30px]">
      <div class="breadcrumbs py-0 text-sm font-normal text-[#171717]">
        <ul>
          {items
            .filter(({ name, item }) => name && item)
            .map((currentItem) =>
              currentItem.item === lastItem?.item && isSearchResultPage
                ? { ...currentItem, name: `Resultados de busca` }
                : currentItem
            )
            .map(({ name, item }, index, array) => (
              <li>
                <a
                  href={relative(item)}
                  class={clx(
                    index + 1 !== array.length
                      ? " text-[#0c881e] hover:text-[#075512]"
                      : "text-black",
                    "no-underline hover:no-underline",
                  )}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {name}
                </a>
              </li>
            ))}
        </ul>
      </div>
      {isProductListingPage && lastItem && (
        <div class="w-full">
          <a
            href={lastItem.item}
            class="text-[27px] text-center lg:text-left lg:text-[32px] lg:leading-10 font-semibold"
          >
            {isSearchResultPage
              ? (
                <div>
                  Resultados da busca por: "
                  <h1 class="inline">{lastItem.name}</h1>"
                </div>
              )
              : <h1>{lastItem.name}</h1>}
          </a>
        </div>
      )}
    </div>
  );
}

export default Breadcrumb;
