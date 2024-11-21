import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture } from "apps/website/components/Picture.tsx";
import { SourceWithFitProp } from "../../components/SourceWithFitProp.tsx";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  desktop: ImageWidget;
  mobile: ImageWidget;
  alt: string;
  href?: string;
}

function Banner({ desktop, mobile, alt, href }: Props) {
  const Component = href ? "a" : "div";
  const Props = href ? { href } : {};

  return (
    <div class="container rounded overflow-hidden max-lg:px-4 mb-8">
      <Component {...Props}>
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
          <img src={desktop} alt={alt} class="w-full object-cover" />
        </Picture>
      </Component>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="320px" />;

export default Banner;
