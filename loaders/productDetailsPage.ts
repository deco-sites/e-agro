import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { AppContext } from "site/apps/site.ts";

const loader = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<ProductDetailsPage | null> => {
  const productsData = (await ctx.invoke.site.loaders.productsFromJson()) ?? [];
  const url = new URL(req.url);

  const product = productsData.find((p) => p.url === url.pathname);

  if (!product) return null;

  const categories = product.category?.split("> ") ?? [];

  return {
    "@type": "ProductDetailsPage",
    breadcrumbList: {
      "@type": "BreadcrumbList",
      numberOfItems: 0,
      itemListElement: [
        ...categories.slice(1).map((item, i) => ({
          "@type": "ListItem" as const,
          item: "#",
          name: item,
          position: i,
        })),
        {
          "@type": "ListItem" as const,
          item: product.url ?? "",
          name: product.name,
          position: categories.length - 1,
        },
      ] ?? [],
    },
    product,
    seo: {
      title: product.name ?? "",
      canonical: product.url ?? "",
      description: product.description ?? "",
    },
  };
};

export default loader;
