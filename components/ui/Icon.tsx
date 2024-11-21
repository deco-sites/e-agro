import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "account_circle"
  | "app-store-badge"
  | "bars"
  | "call"
  | "card"
  | "cart"
  | "check-circle"
  | "chevron-right"
  | "chevron"
  | "close"
  | "error"
  | "favorite"
  | "google-play-badge"
  | "home_pin"
  | "local_shipping"
  | "location"
  | "menu"
  | "pan_zoom"
  | "pix"
  | "search"
  | "sell"
  | "share"
  | "shopping_bag"
  | "trash"
  | "user"
  | "verified-seal"
  | "ChevronDown"
  | "Trash"
  | "home"
  | "circles"
  | "chevron-right-fill"
  | "quem-somos"
  | "money"
  | "MoneyCurrency"
  | "Filter";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="search" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon({ id, size = 24, width, height, ...otherProps }: Props) {
  return (
    <svg {...otherProps} width={width ?? size} height={height ?? size}>
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
