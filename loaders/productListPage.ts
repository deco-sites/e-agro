import type { Product } from "apps/commerce/types.ts";
import type { AppContext } from "site/apps/site.ts";

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

  /** @title Quantos produtos devem ser exibidos? */
  count: number;

  /** @title Parâmetros de filtros */
  filtersParams: FilterParams[];
}

/**
 * @title Deco Integration - Product List Page - Local Json
 * @description Product List Page loader
 */
export default async function loader(
  { filtersParams = [], count = 12 }: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Product[] | null> {
  const productsData = (await ctx.invoke.site.loaders.productsFromJson()) ?? [];

  if (!productsData.length) return null;

  const filtersParamsRecord = filtersParams?.reduce(
    (acc, { key, value }) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const { products } = getFilteredProducts(
    productsData,
    filtersParamsRecord,
    count,
  );

  return products;
}

const getFilteredProducts = (
  products: Product[],
  filtersParams: Record<string, string>,
  count: number,
) => {
  const filteredProducts = products.filter((product) => {
    return Object.entries(filtersParams).every(([key, value]) => {
      return product.additionalProperty?.some((property) =>
        property.name === key && property.value === value
      );
    });
  });

  const properties = filteredProducts.flatMap((product) =>
    product.additionalProperty
  ).filter((property) => !!property);

  return {
    products: filteredProducts.slice(0, count),
    properties,
  };
};
