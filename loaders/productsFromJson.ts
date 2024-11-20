import { Product } from "apps/commerce/types.ts";

/**
 * @title Deco Integration - Products from Json
 * @description Loads products from a JSON file in /static/products.json
 */
export default async function loader(): Promise<Product[] | null> {
  try {
    const data = await Deno.readTextFile("./static/products.json");
    const products: Product[] = JSON.parse(data);
    return products;
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
    return null;
  }
}

export const cache = "stale-while-revalidate";
