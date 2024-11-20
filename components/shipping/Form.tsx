import type { SKU } from "apps/vtex/utils/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  items: SKU[];
}

export default function Form({ items }: Props) {
  const slot = useId();

  return (
    <div class="flex flex-col gap-4 bg-[#f7f7f7] rounded-lg p-4">
      <div class="flex flex-col">
        <span class="text-base text-black font-semibold">
          Simule o frete e prazo de entrega
        </span>
      </div>

      <form
        class="relative w-full flex gap-4"
        hx-target={`#${slot}`}
        hx-swap="innerHTML"
        hx-sync="this:replace"
        hx-post={useComponent(import.meta.resolve("./Results.tsx"), {
          items,
        })}
      >
        <input
          as="input"
          type="text"
          class="input input-bordered w-full rounded-lg"
          placeholder="00000000"
          name="postalCode"
          maxLength={8}
          size={8}
        />
        <button type="submit" class="btn no-animation">
          <span class="[.htmx-request_&]:hidden inline">Calculate</span>
          <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
        </button>
      </form>

      {/* Results Slot */}
      <div id={slot} />
    </div>
  );
}
