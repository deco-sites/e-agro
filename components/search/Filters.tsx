import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { Accordion } from "site/components/ui/Accordion.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  qtdResults?: number;
  clearFiltersUrl?: string;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, label, quantity }: FilterToggleValue) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      {/* <div aria-checked={selected} class="checkbox" /> */}
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-400">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const avatars = key === "tamanho" || key === "cor";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx(`flex flex-wrap gap-2 pt-2`, flexDirection)}>
      {values
        .filter((value) => !value.selected)
        .map((item) => {
          const { url, selected, value } = item;

          if (avatars) {
            return (
              <a href={url} rel="nofollow">
                <Avatar
                  content={value}
                  variant={selected ? "active" : "default"}
                />
              </a>
            );
          }

          if (key === "price") {
            const range = parseRange(item.value);

            return (
              range && (
                <ValueItem
                  {...item}
                  label={`${formatPrice(range.from)} - ${
                    formatPrice(
                      range.to,
                    )
                  }`}
                />
              )
            );
          }

          return <ValueItem {...item} />;
        })}
    </ul>
  );
}

function SelectedFilters({ filters, qtdResults = 0, clearFiltersUrl }: Props) {
  const getSelectedFilters = () => {
    return filters
      .filter(isToggle)
      .filter((filter) => filter.label !== "Somente com preço")
      .flatMap((filter) =>
        filter.values
          .filter((value) => value.selected)
          .map((value) => ({
            value: value.value,
            url: value.url,
          }))
      );
  };

  const selectedFilters = getSelectedFilters();

  if (selectedFilters.length === 0) {
    return null;
  }

  return (
    <div class="flex flex-col mb-8">
      <span class="text-lg font-semibold text-base-400">
        {selectedFilters.length > 1
          ? `${selectedFilters.length} filtros aplicados`
          : `${selectedFilters.length} filtro aplicado`}
      </span>
      <span class="mt-2 text-sm text-[#6d6e71]">
        {qtdResults > 1
          ? `${qtdResults} resultados`
          : `${qtdResults} resultado`}
      </span>
      <div class="flex gap-4 flex-wrap mt-4">
        {selectedFilters.map((filter) => (
          <a href={filter.url} class="no-underline">
            <div
              class={clx(
                "flex items-center rounded-full px-2 py-[5px]",
                "bg-[#0c881e] cursor-pointer hover:bg-[#0c881e] transition-colors duration-300",
              )}
            >
              <p class="text-sm text-white">{filter.value}</p>
              <Icon id="close" width={16} height={16} class="text-white" />
            </div>
          </a>
        ))}
      </div>
      <a
        href={clearFiltersUrl ?? "#"}
        class="text-sm text-[#0c881e] flex items-center gap-[6px] mt-[18px]"
      >
        <Icon id="Trash" width={16} height={16} class="text-[#0c881e]" />
        <span class="underline">Limpar filtros</span>
      </a>
    </div>
  );
}

const QTD_FILTERS_OPEN = 5;

const FILTER_SORT_BY = ["Categoria", "Somente com preço"];

function Filters({ filters, qtdResults, clearFiltersUrl }: Props) {
  return (
    <div class="flex flex-col">
      <SelectedFilters
        filters={filters}
        qtdResults={qtdResults}
        clearFiltersUrl={clearFiltersUrl}
      />
      <ul class="flex flex-col p-4 sm:p-0">
        {filters
          .sort((a, b) => {
            const indexA = FILTER_SORT_BY.indexOf(a.label);
            const indexB = FILTER_SORT_BY.indexOf(b.label);

            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          })
          .filter(isToggle)
          .map((filter, index) => {
            if (filter.label === "Categoria") {
              return (
                <div class="flex flex-col gap-2 p-4 rounded-lg bg-[#f7f7f7]">
                  <span class="text-lg font-semibold">Categorias</span>
                  <FilterValues {...filter} />
                </div>
              );
            }

            if (filter.label === "Somente com preço") {
              const currentFilter = filter.values[0];
              return (
                <div class="flex items-center py-6">
                  <a
                    href={currentFilter.url}
                    style={{
                      padding: "4px 20px 4px 4px",
                    }}
                    class={clx(
                      "flex items-center rounded-full gap-2",
                      "transition-colors duration-300",
                      currentFilter.selected
                        ? "bg-[#0c881e] cursor-pointer hover:bg-[#075512] text-white"
                        : "bg-[#f7f7f7] text-black hover:bg-[#0c881e] hover:text-white text-sm",
                    )}
                  >
                    <div class="rounded-full flex items-center justify-center bg-white size-[30px]">
                      <Icon id="MoneyCurrency" width={20} height={20} />
                    </div>
                    <p class="">Somente com preço</p>
                  </a>
                </div>
              );
            }

            return (
              <li class="flex flex-col gap-4 border-b border-[#f0f0f0] last:border-b-0 first:pt-0 py-4">
                <Accordion
                  header={
                    <div class="flex justify-between items-center">
                      <span class="text-base font-bold">{filter.label}</span>
                      <Icon
                        id="ChevronDown"
                        width={18}
                        height={18}
                        class="custom-accordion-indicator"
                      />
                    </div>
                  }
                  id={filter.key}
                  open={index <= QTD_FILTERS_OPEN}
                >
                  <FilterValues {...filter} />
                </Accordion>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Filters;
