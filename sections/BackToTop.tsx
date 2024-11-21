import { useScript } from "@deco/deco/hooks";

export default function BackToTop() {
  return (
    <div class="container flex justify-center">
      <button
        type="button"
        class="border-2 border-[#0c881e] text-[#0c881e] hover:border-[#075512] hover:text-[#075512] transition-colors text-sm font-bold bg-white rounded-full p-2.5 mx-auto my-6"
        hx-on:click={useScript(() => scrollTo({ top: 0, behavior: "smooth" }))}
      >
        Voltar ao topo
      </button>
    </div>
  );
}
