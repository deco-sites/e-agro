import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture } from "apps/website/components/Picture.tsx";
import { SourceWithFitProp } from "../../components/SourceWithFitProp.tsx";
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
              <SourceWithFitProp
                media="(max-width: 640px)"
                src={mobile}
                width={335}
                height={572}
                fit="contain"
              />
              <SourceWithFitProp
                media="(min-width: 640px)"
                src={desktop}
                width={1320}
                height={480}
                fit="contain"
              />
              <img src={desktop} alt={alt} class="w-full h-full object-cover" />
            </Picture>
          </Component>
        );
      })}
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="300px" />;

export default DoubleBanner;
