import { useScript } from "@deco/deco/hooks";
import { SEARCHBAR_INPUT_FORM_ID } from "../../../constants.ts";
import Icon from "../../ui/Icon.tsx";

export default function Searchbar() {
  return (
    <form
      id={SEARCHBAR_INPUT_FORM_ID}
      class="flex items-center relative h-full max-lg:w-full"
      hx-on:submit={useScript(() => {
        // @ts-ignore -
        event.preventDefault();

        // @ts-ignore -
        const value = event.target.search.value;

        location.href = `/s?q=${encodeURIComponent(value)}`;
      })}
    >
      <Icon
        id="search"
        size={16}
        class="text-[#0c881e] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
      />
      <input
        id="search"
        tabIndex={0}
        class="text-black border border-[#a7a8ac] rounded-[10px] pl-9 pr-6 h-full text-sm w-full outline-0 focus-visible:shadow-[#0670bf_0px_0px_2px_2px]"
        placeholder="Busca"
        autocomplete="off"
      />
    </form>
  );
}
