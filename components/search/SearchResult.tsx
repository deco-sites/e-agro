import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Breadcrumb from "../ui/Breadcrumb.tsx";
import Drawer from "../ui/Drawer.tsx";
// import Sort from "./Sort.tsx";
import { type SectionProps } from "@deco/deco";
import { useDevice, useScript } from "@deco/deco/hooks";
import Pagination from "site/components/search/Pagination.tsx";
export interface Layout {
  /**
   * @title Pagination
   * @description Format of the pagination
   */
  pagination?: "show-more" | "pagination";
}
export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  /** @hidden */
  partial?: "hideMore" | "hideLess";
}
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}
const useUrlRebased = (
  overrides: string | undefined,
  base: string,
  clearFilters?: boolean,
) => {
  let url: string | undefined = undefined;

  if (clearFilters) {
    // Mantém apenas o pathname da URL base
    const final = new URL(base);
    url = final.pathname;
    return url;
  }

  if (overrides) {
    const temp = new URL(overrides, base);
    const final = new URL(base);
    final.pathname = temp.pathname;
    for (const [key, value] of temp.searchParams.entries()) {
      final.searchParams.set(key, value);
    }
    url = final.href;
  }

  return url;
};
function PageResult(props: SectionProps<typeof loader>) {
  const { layout, startingPage = 0 } = props;
  const page = props.page!;
  const { products, pageInfo } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  // const nextPageUrl = useUrlRebased(pageInfo.nextPage, url);
  // const prevPageUrl = useUrlRebased(pageInfo.previousPage, url);
  // const partialPrev = useSection({
  //   href: prevPageUrl,
  //   props: { partial: "hideMore" },
  // });
  // const partialNext = useSection({
  //   href: nextPageUrl,
  //   props: { partial: "hideLess" },
  // });
  const infinite = layout?.pagination !== "pagination";
  return (
    <div class="grid grid-flow-row grid-cols-1 place-items-center">
      {
        /* <div class={clx('pb-2 sm:pb-10', (!prevPageUrl || partial === 'hideLess') && 'hidden')}>
                <a rel='prev' class='btn btn-ghost' hx-swap='outerHTML show:parent:top' hx-get={partialPrev}>
                    <span class='inline [.htmx-request_&]:hidden'>Show Less</span>
                    <span class='loading loading-spinner hidden [.htmx-request_&]:block' />
                </a>
            </div> */
      }

      <div
        data-product-list
        class={clx(
          "grid items-center",
          "grid-cols-1 gap-6",
          "lg:grid-cols-4 lg:gap-4",
          "w-full",
        )}
      >
        {products?.map((product, index) => (
          <ProductCard
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            class="max-lg:flex-row h-[154px] lg:h-[398px] lg:min-w-[160px] lg:max-w-[300px]"
          />
        ))}
      </div>

      <div class="py-10">
        {infinite
          ? (
            <div class="flex justify-center [&_section]:contents">
              {
                /* <a
                            rel='next'
                            class={clx('btn btn-ghost', (!nextPageUrl || partial === 'hideMore') && 'hidden')}
                            hx-swap='outerHTML show:parent:top'
                            hx-get={partialNext}
                        >
                            <span class='inline [.htmx-request_&]:hidden'>Show More</span>
                            <span class='loading loading-spinner hidden [.htmx-request_&]:block' />
                        </a> */
              }
            </div>
          )
          : <Pagination pageInfo={pageInfo} />}
      </div>
    </div>
  );
}
const setPageQuerystring = (page: string, id: string) => {
  const element = document.getElementById(id)?.querySelector(
    "[data-product-list]",
  );
  if (!element) {
    return;
  }
  new IntersectionObserver((entries) => {
    const url = new URL(location.href);
    const prevPage = url.searchParams.get("page");
    for (let it = 0; it < entries.length; it++) {
      if (entries[it].isIntersecting) {
        url.searchParams.set("page", page);
      } else if (
        typeof history.state?.prevPage === "string" &&
        history.state?.prevPage !== page
      ) {
        url.searchParams.set("page", history.state.prevPage);
      }
    }
    history.replaceState({ prevPage }, "", url.href);
  }).observe(element);
};
function Result(props: SectionProps<typeof loader>) {
  const container = useId();
  const controls = useId();
  const device = useDevice();
  const { startingPage = 0, url, partial } = props;
  const clearFiltersUrl = useUrlRebased(undefined, url, true);
  const page = props.page!;
  const { products, filters, breadcrumb, pageInfo } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        // TODO: get category name from search or cms setting
        item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
        item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
        items: page.products?.map((product, index) =>
          mapProductToAnalyticsItem({
            ...useOffer(product.offers),
            index: offset + index,
            product,
            breadcrumbList: page.breadcrumb,
          })
        ),
      },
    },
  });
  // const results = (
  //   <span class="text-sm font-normal">
  //     {page.pageInfo.recordPerPage} of {page.pageInfo.records} results
  //   </span>
  // );
  // const sortBy = sortOptions.length > 0 && (
  //   <Sort sortOptions={sortOptions} url={url} />
  // );

  const FiltersSuggestions = () => (
    <div class="flex gap-4">
      {["A-Z", "Menor Preço"].map((filter) => (
        <div
          class={clx(
            "flex items-center h-8 rounded-2xl px-[14px] py-[6px]",
            " bg-[#f7f7f7] cursor-pointer hover:bg-[#e5e6e7] transition-colors duration-300",
          )}
        >
          <p class="text-base font-semibold text-black">{filter}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div id={container} {...viewItemListEvent} class="w-full">
        {partial
          ? <PageResult {...props} />
          : (
            <div class="container lg:max-w-[1248px] flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-6 px-5 lg:px-0">
              <div class="w-full flex flex-col lg:pb-7 lg:border-b border-[#f7f7f7]">
                <Breadcrumb
                  itemListElement={breadcrumb?.itemListElement}
                  isProductListingPage={!!page}
                />
                <div class="w-full mt-4 gap-6 items-center hidden sm:flex">
                  <p class="text-sm font-normal text-[#6d6e71]">
                    Sugestões de filtros
                  </p>
                  <FiltersSuggestions />
                </div>
              </div>

              <div class="flex sm:hidden items-center gap-4 sticky top-0 bg-white z-20">
                {
                  /* <div class="flex flex-col">
                      {results}
                      {sortBy}
                    </div> */
                }

                <label
                  class={clx(
                    "flex items-center rounded-full gap-2 py-1 pl-1 pr-5",
                    "transition-colors duration-300",
                    "bg-[#0c881e] text-white",
                    "text-sm",
                  )}
                  for={controls}
                >
                  <div class="rounded-full flex items-center justify-center bg-white size-[30px]">
                    <Icon id="Filter" width={16} height={16} />
                  </div>
                  Filtros
                </label>
                <FiltersSuggestions />
              </div>

              <div class="border-b border-[#f7f7f7] w-full lg:hidden" />

              {device === "mobile" && (
                <Drawer
                  id={controls}
                  aside={
                    <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
                      <div class="flex justify-between items-center">
                        <h1 class="px-4 py-3">
                          <span class="font-medium text-2xl">Filters</span>
                        </h1>
                        <label class="btn btn-ghost" for={controls}>
                          <Icon id="close" />
                        </label>
                      </div>
                      <div class="flex-grow overflow-auto">
                        <Filters
                          filters={filters}
                          qtdResults={products.length}
                          clearFiltersUrl={clearFiltersUrl}
                        />
                      </div>
                    </div>
                  }
                >
                </Drawer>
              )}

              <div class="grid grid-cols-1 lg:grid-cols-[303px_1fr] gap-[18px]">
                {device === "desktop" && (
                  <aside class="place-self-start flex flex-col gap-9 w-full">
                    <Filters
                      filters={filters}
                      qtdResults={products.length}
                      clearFiltersUrl={clearFiltersUrl}
                    />
                  </aside>
                )}

                <div class="flex flex-col gap-9">
                  {
                    /* {device === "desktop" && (
                    <div class="flex justify-between items-center">
                      {results}
                      <div>
                        {sortBy}
                      </div>
                    </div>
                  )} */
                  }
                  <PageResult {...props} />
                </div>
              </div>
            </div>
          )}
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            setPageQuerystring,
            `${pageInfo.currentPage}`,
            container,
          ),
        }}
      />
    </>
  );
}
function SearchResult({ page, ...props }: SectionProps<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }
  return <Result {...props} page={page} />;
}
export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};
export default SearchResult;
