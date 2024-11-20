import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem, { NavItemProps } from "../../components/header/NavItem.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";

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
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /** @title Logo */
  logo: Logo;
  /**
   * @description Usefull for lazy loading hidden elements, like hamburguer menus etc
   * @hide true */
  loading?: "eager" | "lazy";
}

const Desktop = ({ navItems, logo, searchbar, loading }: Props) => (
  <>
    <Modal id={SEARCHBAR_POPUP_ID}>
      <div
        class="absolute top-0 bg-base-100 container"
        style={{ marginTop: HEADER_HEIGHT_MOBILE }}
      >
        {loading === "lazy"
          ? (
            <div class="flex justify-center items-center">
              <span class="loading loading-spinner" />
            </div>
          )
          : <Searchbar {...searchbar} />}
      </div>
    </Modal>

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

          <div class="bg-[#f7f7f7]">
            <div class="flex items-center justify-between container">
              <label
                for={SEARCHBAR_POPUP_ID}
                class="bg-white"
              >
                <Icon id="search" />
                <span class="text-base-400 truncate">
                  Search products, brands...
                </span>
              </label>

              <div class="flex gap-4 place-self-end">
                <Bag />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const Mobile = ({ logo, searchbar, navItems, loading }: Props) => (
  <>
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
          <div class="w-screen overflow-y-auto">
            {loading === "lazy"
              ? (
                <div class="h-full w-full flex items-center justify-center">
                  <span class="loading loading-spinner" />
                </div>
              )
              : <Searchbar {...searchbar} />}
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          {loading === "lazy"
            ? (
              <div
                id={SIDEMENU_CONTAINER_ID}
                class="h-full flex items-center justify-center"
                style={{ minWidth: "100vw" }}
              >
                <span class="loading loading-spinner" />
              </div>
            )
            : <Menu navItems={navItems ?? []} />}
        </Drawer.Aside>
      }
    />

    <div
      class="grid place-items-center w-screen px-5 gap-4"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns:
          "min-content auto min-content min-content min-content",
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="open menu"
      >
        <Icon id="menu" />
      </label>

      {logo && (
        <a
          href="/"
          class="flex-grow inline-flex items-center justify-center"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="Store logo"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 100}
            height={logo.height || 13}
          />
        </a>
      )}

      <label
        for={SEARCHBAR_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="search icon button"
      >
        <Icon id="search" />
      </label>
      <Bag />
    </div>
  </>
);

export default function Header(props: Props) {
  const device = useDevice();
  const isDesktop = device === "desktop";

  return (
    <header
      style={{
        height: isDesktop ? HEADER_HEIGHT_DESKTOP : HEADER_HEIGHT_MOBILE,
      }}
    >
      <div class="bg-base-100 fixed w-full z-40">
        {isDesktop ? <Desktop {...props} /> : <Mobile {...props} />}
      </div>
    </header>
  );
}

export const LoadingFallback = (props: Props) => (
  <Header {...props} loading="lazy" />
);
