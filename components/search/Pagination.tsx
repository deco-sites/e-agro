import type { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "site/components/ui/Icon.tsx";
import { clx } from "site/sdk/clx.ts";

export interface Props {
  pageInfo: ProductListingPage["pageInfo"];
  class?: string;
}

class Ellipsis {}

function Pagination({ pageInfo, class: _class = "" }: Props) {
  // pageInfo.records = 300
  // pageInfo.recordPerPage = 3

  const totalPages = Math.ceil(pageInfo.records! / pageInfo.recordPerPage!);
  const maxPageNumbers = 4;
  const allPages = Array(totalPages)
    .fill(0)
    .map((_, i) => i + 1);

  let paginations = [] as (number | Ellipsis)[];

  const currentPageIndex = pageInfo.currentPage - 1;
  const lastPageIndex = currentPageIndex + maxPageNumbers - 1;

  if (totalPages - pageInfo.currentPage <= maxPageNumbers) {
    // [6, 7, 8, 9, 10]
    paginations = allPages.slice(
      Math.max(0, currentPageIndex - 2),
      Math.min(totalPages + 1, currentPageIndex + 3),
    );
  } else {
    // [1, 2, 3, 4, ..., 10]
    paginations = [
      ...allPages.slice(Math.max(0, currentPageIndex - 2), lastPageIndex),
      Ellipsis,
      allPages.at(-1)!,
    ];
  }

  const pages = paginations.map((page) => {
    const url = (pageInfo.nextPage ?? pageInfo.previousPage ?? "").replace(
      /page=\d+/,
      `page=${page}`,
    );

    return {
      page,
      url: url.toString(),
    };
  });

  return (
    <div
      class={clx("flex items-center text-black justify-center gap-2", _class)}
    >
      {pageInfo.previousPage && (
        <a
          aria-label="previous page link"
          rel="prev"
          href={pageInfo.previousPage ?? "#"}
          class="size-8 flex items-center justify-center hover:bg-[#f1f2fc]"
        >
          <Icon
            size={16}
            id="chevron-right-fill"
            strokeWidth={3}
            class="rotate-180 transition-colors group-hover:text-white"
          />
        </a>
      )}
      <div class="flex items-center gap-2">
        {pages.map(({ page, url }) =>
          page === Ellipsis
            ? (
              <span class="text-black size-8 flex justify-center items-center">
                ...
              </span>
            )
            : (
              <a
                aria-label={`page ${page}`}
                href={url}
                data-current={pageInfo.currentPage === page}
                class="size-8 text-black text-sm border-[#0d881d] data-[current=true]:border-b-2 data-[current=true]:text-[#0d881d] hover:bg-[#f1f2fc] hover:text-[#0d881d] flex justify-center items-center"
              >
                {page}
              </a>
            )
        )}
      </div>
      {pageInfo.nextPage && (
        <a
          aria-label="next page link"
          rel="next"
          href={pageInfo.nextPage ?? "#"}
          class="size-8 flex items-center justify-center hover:bg-[#f1f2fc]"
        >
          <Icon
            size={16}
            id="chevron-right-fill"
            strokeWidth={3}
            class="transition-colors group-hover:text-white"
          />
        </a>
      )}
    </div>
  );
}

export default Pagination;
