import { ComponentChildren } from "preact";
import Icon from "./Icon.tsx";

interface Props {
  children: ComponentChildren;
  maxHeight?: number;
}

function SeeMore({ children, maxHeight = 70 }: Props) {
  return (
    <div class="rounded mb-4">
      <input type="checkbox" id="show-more" className="hidden peer" />
      <div
        style={{ "--max-height": `${maxHeight}px` }}
        class="grid grid-rows-[var(--max-height)] transition-[grid-template-rows] duration-500 ease-in-out peer-checked:grid-rows-1"
      >
        <div class="overflow-hidden">{children}</div>
      </div>
      <label
        for="show-more"
        class="text-[#0c881e] hover:text-[#075512] font-medium text-sm flex gap-2 items-center peer-checked:[&>svg]:rotate-180 peer-checked:[&>.see-more]:hidden peer-checked:[&>.see-less]:inline"
      >
        <span class="see-more">Mais Informações +</span>
        <span class="see-less hidden">Menos Informações -</span>
      </label>
    </div>
  );
}

export default SeeMore;
