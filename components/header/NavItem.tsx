import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";

export interface NavItemProps {
  label: string;
  /** @title Link */
  href: string;
  columns?: NavItemChildrenProps[][];
  image?: ImageWidget;
  /** @title Image Link */
  imageHref?: string;
}

/**
 * @titleBy title
 */
interface NavItemChildrenProps {
  title: string;
  /** @title Link */
  href: string;
  children: Item[];
}

/**
 * @titleBy label
 */
interface Item {
  label: string;
  /** @title Link */
  href: string;
}

function NavItem({ label, href, columns, image, imageHref }: NavItemProps) {
  const hasColumns = columns && columns.length > 0;

  return (
    <li
      data-column={hasColumns ? "" : undefined}
      class="group flex items-center text-black relative h-full"
    >
      <a
        href={href}
        class={clx(
          "relative flex items-center gap-1",
          hasColumns && "text-[#0c881e]",
        )}
      >
        {label}
        {hasColumns && (
          <Icon
            id="chevron-right"
            size={20}
            class="text-[#0c881e] rotate-90 group-hover:-rotate-90 transition-transform translate-y-px"
          />
        )}
        <div class="w-full h-0.5 bg-[#0f62fe] absolute -bottom-0.5 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>

      {columns && columns.length > 0 && (
        <div class="absolute hidden hover:flex group-hover:flex top-full left-1/2 -translate-x-1/2 bg-[#f7f7f7] gap-7 p-4 pt-6 rounded-b-md divide-x divide-[#e5e6e7]">
          <div class="flex items-start gap-1 max-h-[400px] overflow-y-auto scrollbar pr-1 shrink-0">
            {columns.map((i) => (
              <ul class="flex flex-col gap-4 min-w-[224px]">
                {i.map(({ title, href, children }) => (
                  <li class="flex flex-col gap-1">
                    <a class="text-black font-semibold" href={href}>
                      {title}
                    </a>
                    <ul class="flex flex-col">
                      {children.map(({ label, href }) => (
                        <li>
                          <a
                            class="hover:text-[#0f62fe] text-sm group/link relative pr-2"
                            href={href}
                          >
                            {label}
                            <div class="absolute top-1/2 -translate-y-1/2 left-[calc(100%-8px)] text-[#0f62fe] opacity-0 group-hover/link:opacity-100 translate-x-0.5 group-hover/link:translate-x-2 transition-transform duration-300">
                              →
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {image && imageHref && (
            <div class="max-h-[400px] shrink-0">
              <Image
                src={image}
                alt={imageHref}
                width={300}
                height={332}
                loading="lazy"
                class="h-full object-contain"
              />
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default NavItem;
