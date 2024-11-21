import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  desktop: ImageWidget;
  mobile: ImageWidget;

  /**
   * @title Texto Alternativo
   * @description Descreva a imagem
   */
  alt: string;

  /** @title Link */
  href?: string;
}

export interface Props {
  /** @title Imagens */
  images?: Banner[];

  /**
   * @title É a maior imagem do site?
   */
  preload?: boolean;
}

function Carousel({ images = [], preload }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex flex-col items-center gap-4 relative container mt-2 mb-10 max-lg:px-4"
    >
      <Slider class="carousel carousel-center w-full">
        {images.map(({ desktop, mobile, alt, href }, index) => {
          const lcp = index === 0 && preload;

          return (
            <Slider.Item index={index} class="carousel-item w-full">
              <a href={href} class="block w-full rounded overflow-hidden">
                <Picture preload={lcp}>
                  <Source
                    media="(max-width: 671px)"
                    fetchPriority={lcp ? "high" : "auto"}
                    src={mobile}
                    width={412}
                  />
                  <Source
                    media="(min-width: 672px)"
                    fetchPriority={lcp ? "high" : "auto"}
                    src={desktop}
                    width={1440}
                  />
                  <img
                    class="object-cover w-full lg:h-full"
                    loading={lcp ? "eager" : "lazy"}
                    src={desktop}
                    alt={alt}
                  />
                </Picture>
              </a>
            </Slider.Item>
          );
        })}
      </Slider>

      <Slider.PrevButton
        class="hidden lg:flex items-center justify-center size-20 bg-[#f8fffb80] rounded-full absolute top-1/2 -translate-y-1/2 -left-14 shadow-[0_0_5px_rgba(0,0,0,0.1)]"
        disabled={false}
      >
        <Icon id="chevron-right" size={60} class="rotate-180 text-[#0c881e]" />
      </Slider.PrevButton>

      <Slider.NextButton
        class="hidden lg:flex items-center justify-center size-20 bg-[#f8fffb80] rounded-full absolute top-1/2 -translate-y-1/2 -right-14 shadow-[0_0_5px_rgba(0,0,0,0.1)]"
        disabled={false}
      >
        <Icon id="chevron-right" size={60} class="text-[#0c881e]" />
      </Slider.NextButton>

      <div class="flex items-center gap-2">
        {images.map((_, index) => (
          <Slider.Dot
            index={index}
            class="bg-[#d8dcdd] disabled:bg-[#0c881e] transition-colors size-2 rounded-full"
          />
        ))}
      </div>

      <Slider.JS rootId={id} infinite />
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="500px" />;

export default Carousel;
