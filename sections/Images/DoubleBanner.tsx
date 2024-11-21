import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";

/**
 * @titleBy alt
 */
interface Banner {
  desktop: ImageWidget;
  mobile: ImageWidget;
  alt: string;
  href?: string;
}

export interface Props {
  /**
   * @minItems 2
   * @maxItems 2
   */
  banners: Banner[];
}

function DoubleBanner({ banners }: Props) {
  return (
    <div class="container max-lg:px-4 mb-8 flex flex-col sm:flex-row gap-y-5 gap-x-8">
      {banners.map(({ desktop, mobile, alt, href }) => {
        const Component = href ? "a" : "div";
        const Props = href ? { href } : {};

        return (
          <Component {...Props} class="flex-1 rounded overflow-hidden">
            <Picture>
              <Source
                media="(max-width: 640px)"
                src={mobile}
                width={335}
                height={572}
              />
              <Source
                media="(min-width: 640px)"
                src={desktop}
                width={1320}
                height={480}
              />
              <img src={desktop} alt={alt} class="w-full h-full object-cover" />
            </Picture>
          </Component>
        );
      })}
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default DoubleBanner;
