import type { RichText } from "apps/admin/widgets.ts";
import Icon from "site/components/ui/Icon.tsx";
import Searchbar from "site/components/search/Searchbar/Form.tsx";
import Section from "site/components/ui/Section.tsx";

interface Props {
  text: RichText;
}

export default function SearchMobile({ text }: Props) {
  return (
    <div class="lg:hidden bg-gradient-to-t from-[#034e88] to-[#0d881d] max-lg:px-4 pt-4 pb-11 relative mb-7 flex flex-col">
      <Icon
        id="circles"
        width={263}
        height={206}
        class="absolute bottom-0 right-0"
      />

      <div
        class="[&_strong]:font-bold [&_*]:!text-sm [&_*]:!text-white [&_h1_*]:!text-[22px] [&_>*:empty]:h-[14px]"
        dangerouslySetInnerHTML={{ __html: text }}
      />

      <div class="w-[calc(100%-32px)] absolute bottom-0 translate-y-1/2 h-10">
        <Searchbar />
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="200px" />;
