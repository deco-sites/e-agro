import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Bag from "../../components/header/Bag.tsx";
import NavItem, {
  type NavItemProps,
} from "../../components/header/NavItem.tsx";
import Searchbar from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { SIDEMENU_DRAWER_ID } from "../../constants.ts";

export interface Logo {
  src: ImageWidget;
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

const Desktop = ({ navItems, logo }: Props) => (
  <>
    <div class="w-full h-full fixed left-0 top-0 z-10 opacity-0 pointer-events-none [&:has(+div_[data-column]:hover)]:opacity-100 transition-opacity bg-[rgba(0,0,0,0.5)]" />

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
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          {/* <Menu navItems={navItems ?? []} /> */}
          <></>
        </Drawer.Aside>
      }
    />

    <div class="flex items-center justify-between px-4 h-[72px]">
      <label for={SIDEMENU_DRAWER_ID} class="">
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

export default function Header(props: Props) {
  const device = useDevice();
  const isDesktop = device === "desktop";

  return (
    <header class="bg-white w-full z-40">
      {isDesktop ? <Desktop {...props} /> : <Mobile {...props} />}

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
  );
}

export const LoadingFallback = (props: Props) => <Header {...props} />;
