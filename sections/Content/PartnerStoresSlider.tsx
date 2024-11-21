import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Title from "../../components/Title.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

/**
 * @titleBy title
 */
interface Item {
  /** @title Link */
  href: string;
  image: ImageWidget;
}

interface Props {
  title: string;
  items: Item[];
}

export default function CategorySlider({ title, items }: Props) {
  const id = useId();
  const isDesktop = useDevice() === "desktop";
  const visibleItems = isDesktop ? 6 : 3;

  return (
    <div
      id={id}
      class="flex flex-col gap-8 container relative mb-6 max-lg:px-4"
    >
      <Title title={title} />

      <div class="w-full lg:px-14">
        <Slider class="carousel carousel-center w-full gap-5">
          {items.map(({ image, href }, index) => (
            <Slider.Item
              index={index}
              class="carousel-item justify-center w-[calc(33.333%-20px+(20px/3))] min-[500px]:w-[calc(25%-20px+(20px/4))] md:w-[calc(20%-20px+(20px/5))] min-[820px]:w-[calc(16.666%-20px+(20px/6))]"
            >
              <a href={href} class="flex flex-col items-center gap-4">
                <div class="bg-white flex items-center justify-center">
                  <Image
                    src={image}
                    alt={title}
                    width={isDesktop ? 120 : 90}
                    height={isDesktop ? 120 : 90}
                  />
                </div>
              </a>
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <Slider.PrevButton class="hidden lg:flex disabled:hidden items-center justify-center z-10 size-20 rounded-full absolute top-1/2 -translate-y-1/2 left-0">
        <Icon id="chevron-right" size={60} class="rotate-180 text-[#0c881e]" />
      </Slider.PrevButton>

      <Slider.NextButton class="hidden lg:flex disabled:hidden items-center justify-center z-10 size-20 rounded-full absolute top-1/2 -translate-y-1/2 right-0">
        <Icon id="chevron-right" size={60} class="text-[#0c881e]" />
      </Slider.NextButton>

      <div class="flex items-center gap-2 mx-auto">
        {items.map((_, index) => (
          <Slider.Dot
            index={index}
            class={clx(
              "bg-[#d8dcdd] disabled:bg-[#0c881e] transition-colors size-2 rounded-full",
              index % visibleItems !== 0 && "hidden",
            )}
          />
        ))}
      </div>

      <Slider.JS rootId={id} />
    </div>
  );
}
