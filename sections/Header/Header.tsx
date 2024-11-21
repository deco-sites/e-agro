import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Bag from "../../components/header/Bag.tsx";
import NavItem, {
  type NavItemProps,
} from "../../components/header/NavItem.tsx";
import Searchbar from "../../components/search/Searchbar/Form.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface Logo {
  src: ImageWidget;
  /**
   * @title Texto Alternativo
   * @description Descreva a imagem
   */
  alt: string;
  width: number;
  height: number;
}

export interface Props {
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItemProps[];
  /** @title Logo */
  logo: Logo;
}

const MENU_ID = "menu";

const Desktop = ({ navItems, logo }: Props) => (
  <>
    <div class="bg-white relative z-20">
      <div class="flex flex-col gap-4 container">
        <div class="flex items-center gap-10 h-[72px]">
          <a href="/" aria-label="Store logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </a>

          <ul class="flex justify-between items-center mr-auto gap-10 h-full">
            {navItems?.map((item) => <NavItem {...item} />)}
          </ul>

          <div class="flex items-center gap-4">
            <a
              href="#/"
              class="font-bold rounded-full w-36 h-8 bg-[#0c881e] hover:bg-[#075512] flex items-center justify-center text-white"
            >
              Entrar
            </a>
            <a
              href="#/"
              class="font-bold rounded-full w-36 h-8 bg-white flex items-center justify-center text-[#0c881e] border-2 border-[#0c881e]"
            >
              Criar conta
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);

const Mobile = ({ logo }: Props) => (
  <>
    <div class="flex items-center justify-between px-4 h-[72px]">
      <label for={MENU_ID}>
        <Icon id="menu" size={32} class="text-[#0c881e]" />
      </label>

      {logo && (
        <a href="/" class="flex items-center justify-center">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
          />
        </a>
      )}

      <a href="#/">
        <Icon id="user" size={32} class="text-[#0c881e]" />
      </a>
    </div>
  </>
);

const Menu = (_props: Props) => (
  <div>
    <input type="checkbox" id={MENU_ID} class="hidden peer" />
    <input type="checkbox" id="next-menu-id-page" class="hidden peer/page" />

    <div class="absolute left-0 top-[168px] bg-white -translate-x-full peer-checked:translate-x-0 transition-transform h-[calc(100vh-168px)] z-30 px-5 py-8 flex flex-col gap-3 w-[300px]">
      <a href="/" class="flex items-center gap-2 text-sm">
        <Icon id="home" size={20} class="text-[#0c881e]" />
        Início
      </a>
      <a href="/sobre" class="flex items-center gap-2 text-sm">
        <Icon id="quem-somos" size={20} class="text-[#0c881e]" />
        Quem somos
      </a>
      <a href="/simulacao-de-credito" class="flex items-center gap-2 text-sm">
        <Icon id="money" size={20} class="text-[#0c881e]" />
        Linhas de crédito
      </a>
      <label for="next-menu-id-page" class="flex items-center gap-2 text-sm">
        <Icon id="cart" size={20} class="text-[#0c881e]" />
        Produtos da loja
        <span>{">"}</span>
      </label>
    </div>
  </div>
);

export default function Header(props: Props) {
  const device = useDevice();
  const isDesktop = device === "desktop";

  return (
    <>
      <div class="w-full h-full fixed left-0 top-0 z-10 opacity-0 pointer-events-none [&:has(+header_:is([data-column]:hover,#menu:checked))]:opacity-100 [&:has(+header_:is([data-column]:hover,#menu:checked))]:pointer-events-auto transition-opacity bg-[rgba(0,0,0,0.5)]" />

      <header class="bg-white w-full relative max-lg:z-40">
        <div class="w-full lg:z-40">
          {isDesktop ? <Desktop {...props} /> : <Mobile {...props} />}
          {!isDesktop && <Menu {...props} />}
        </div>

        <div class="bg-[#f7f7f7] h-24 lg:h-14 flex items-center max-lg:px-4">
          <div class="flex flex-col lg:flex-row gap-2 lg:items-center justify-between w-full lg:container">
            <Searchbar />

            <div class="flex items-center gap-4 divide-x divide-[#A8ACAC] h-8">
              <Bag />
              <div class="flex items-center gap-2 pl-4 h-full cursor-pointer w-full">
                <Icon id="location" size={18} class="text-[#0c881e]" />
                <span class="text-black text-sm">Região de entrega</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export const LoadingFallback = (props: Props) => <Header {...props} />;
