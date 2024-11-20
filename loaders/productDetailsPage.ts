import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "site/apps/site.ts";

const loader = async (
  _props: unknown,
  req: Request,
  ctx: AppContext
): Promise<ProductDetailsPage | null> => {
  const productsData = (await ctx.invoke.site.loaders.productsFromJson()) ?? [];
  const url = new URL(req.url);

  const product = productsData.find((p) => p.url === url.pathname);

  if (!product) return null;

  return {
    "@type": "ProductDetailsPage",
    breadcrumbList: {
      "@type": "BreadcrumbList",
      numberOfItems: 0,
      itemListElement: [
        {
          "@type": "ListItem",
          item: product.name,
          position: 0,
        },
      ],
    },
    product,
    seo: {
      title: product.name,
      canonical: product.url,
      description: product.description,
    },
  };
};

export default loader;
