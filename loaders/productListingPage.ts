import { AppContext } from "site/apps/site.ts";
import {
  FilterToggle,
  FilterToggleValue,
  // Offer,
  Product,
  // ProductLeaf,
  ProductListingPage,
  PropertyValue,
} from "apps/commerce/types.ts";
import { pageTypesToSeo } from "apps/vtex/utils/legacy.ts";
import { PageType } from "apps/vtex/utils/types.ts";

/**
 * @title {{key}} - {{value}}
 */
interface FilterParams {
  key: string;
  value: string;
}

interface Props {
  // filtersToShow: FilterToShowItem[];
  // unavailableThreshold: number;

  /**
   * @default 36
   */
  limit: number;

  /**
   * @default 16
   */
  mobileLimit: number;

  /**
   * @title Items per page default
   * @description number of products per page to display
   */
  count: number;

  filtersParams: FilterParams[];
}

/**
 * @title Deco Integration - Local Json
 * @description Product Listing Page loader
 */
export default async function loader(
  { filtersParams = [], count = 12 }: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductListingPage | null> {
  const productsData = (await ctx.invoke.site.loaders.productsFromJson()) ?? [];

  if (!productsData.length) return null;

  const url = new URL(req.url);

  const filtersParamsRecord = filtersParams?.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  for (const [key, value] of url.searchParams.entries()) {
    if (key !== "page") {
      filtersParamsRecord[key] = value;
    }
  }

  const page = Number(url.searchParams.get("page") ?? 1);
  url.searchParams.delete("page");

  const offset = (page - 1) * count;
  const hasPreviousPage = page > 0;
  const currentPage = page + offset;

  const { products, total, properties } = getFilteredProducts(
    productsData,
    filtersParamsRecord,
    offset,
    count,
  );

  const filters = toFilters(properties, filtersParamsRecord, req.url);
  const nextPage = new URL(req.url);
  nextPage.searchParams.set("page", String(page + 1));

  const previousPage = new URL(req.url);
  previousPage.searchParams.set("page", String(page - 1));

  const pageTypes: PageType[] = [
    {
      id: null,
      name: "Insumos agrícolas",
      url: "/insumos-agricolas",
      title: "Insumos agrícolas | As melhores marcas estão no E-agro",
      metaTagDescription:
        "Encontre as melhores marcas de Insumos agrícolas no E-agro e aproveite nossas condições especiais! Tudo que o agro precisa tem aqui. Confira!",
      pageType: "FullText",
    },
  ];

  return {
    "@type": "ProductListingPage",
    filters,
    products: products,
    breadcrumb: {
      itemListElement: [
        {
          "@type": "ListItem",
          item: "/insumos-agricolas",
          name: "Insumos agrícolas",
          position: 0,
        },
      ],
      "@type": "BreadcrumbList",
      numberOfItems: 1,
    },
    sortOptions: [
      {
        label: "Posição",
        value: "",
      },
      {
        label: "Nome A-Z",
        value: "name:asc",
      },
      {
        label: "Nome Z-A",
        value: "name:desc",
      },
      {
        label: "Menor preço",
        value: "price:asc",
      },
      {
        label: "Maior preço",
        value: "price:desc",
      },
      {
        label: "Desconto",
        value: "discount",
      },
    ],
    pageInfo: {
      currentPage: page,
      nextPage: page * count < total ? nextPage.href : undefined,
      previousPage: page > 1 ? previousPage.href : undefined,
      records: total,
      recordPerPage: count,
    },
    seo: pageTypesToSeo(
      pageTypes,
      url.toString(),
      hasPreviousPage ? currentPage : undefined,
    ),
  };
}

const toFilters = (
  properties: PropertyValue[],
  filtersParams: Record<string, string>,
  url: string,
): FilterToggle[] => {
  const filterObject = Object.values(
    properties.reduce((acc, current) => {
      const { name, value } = current;
      const key = `${name}-${value}`;
      const filter = acc[key];

      if (!filter) {
        acc[key] = { ...current, quantity: 0 };
      }

      acc[key].quantity += 1;

      return acc;
    }, {} as Record<string, PropertyValue & { quantity: number }>),
  ).reduce((acc, current) => {
    if (current.name && !acc[current.name]) {
      acc[current.name] = {
        "@type": "FilterToggle",
        label: current.name,
        key: current.name,
        quantity: 0,
        values: [],
      };
    }

    if (current.name && current.value) {
      const filter = acc[current.name];
      const currentURL = new URL(url);

      const isSelected = filtersParams[current.name] === current.value;

      if (isSelected) {
        currentURL.searchParams.delete(current.name);
      } else {
        currentURL.searchParams.set(current.name, current.value);
      }

      const filterItem: FilterToggleValue = {
        label: current.value,
        value: current.value,
        quantity: current.quantity,
        url: currentURL.href,
        selected: isSelected,
      };

      filter.values.push(filterItem);
      filter.quantity += 1;
    }

    return acc;
  }, {} as Record<string, FilterToggle>);

  const filter = Object.values(filterObject);

  return filter;
};

const getFilteredProducts = (
  products: Product[],
  filtersParams: Record<string, string>,
  offset: number,
  count: number,
) => {
  const filteredProducts = products.filter((product) => {
    return Object.entries(filtersParams).every(([key, value]) => {
      return product.additionalProperty?.some(
        (property) => property.name === key && property.value === value,
      );
    });
  });

  const paginatedProducts = filteredProducts.slice(offset, offset + count);

  const properties = paginatedProducts
    .flatMap((product) => product.additionalProperty)
    .filter((property) => !!property);

  return {
    products: paginatedProducts,
    total: products.length,
    properties,
  };
};
