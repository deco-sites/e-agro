import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";
import type { Logo } from "../Header/Header.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface Link {
  label: string;
  href: string;
}

interface NavItem {
  title: string;
  children: Link[];
}

interface Social {
  icon: ImageWidget;
  href: string;
}

interface Props {
  logo: Logo;
  navItems: NavItem[];
  socials: Social[];
  googlePlayLink: string;
  appStoreLink: string;
  appStoreQrCode: ImageWidget;
  footerBottomTexts: string[];
}

function Footer(
  {
    logo,
    navItems,
    socials,
    googlePlayLink,
    appStoreLink,
    appStoreQrCode,
    footerBottomTexts,
  }: Props,
) {
  return (
    <footer>
      <div class="bg-[#f7f7f7] max-lg:px-4">
        <div class="container border-t border-[#044ada] py-10 flex flex-col lg:flex-row gap-y-5">
          <div class="flex flex-col lg:flex-row justify-between w-full gap-y-2">
            <a href="/" class="w-full max-w-[30%]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                class="-translate-y-3"
              />
            </a>

            <div class="w-full flex flex-col sm:flex-row gap-2">
              {navItems.map(({ title, children }) => (
                <div class="flex flex-col gap-4 w-[160px]">
                  <span class="text-[#171717] font-semibold">{title}</span>

                  <ul class="flex flex-col">
                    {children.map(({ label, href }) => (
                      <li>
                        <a
                          class="text-[#47484c] hover:text-[#0f62fe] text-sm group/link relative pr-2"
                          href={href}
                        >
                          {label}
                          <div class="absolute top-1/2 -translate-y-1/2 left-[calc(100%-8px)] text-[#0f62fe] opacity-0 group-hover/link:opacity-100 translate-x-0.5 group-hover/link:translate-x-2 transition-transform duration-300">
                            →
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div class="h-px w-full bg-[#b9b9b9] lg:hidden" />

          <div class="lg:w-full lg:max-w-[41.666%] flex flex-col sm:flex-row lg:justify-between gap-y-4">
            <div class="w-px h-full bg-[#dedede] hidden lg:block" />

            <div class="flex flex-col gap-3 max-lg:mr-12">
              <span class="text-[#47484c] text-xs">Siga o E-agro</span>
              <div class="flex items-center gap-4">
                {socials.map(({ icon, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="shrink-0"
                  >
                    <Image
                      src={icon}
                      alt=""
                      loading="lazy"
                      width={32}
                      height={32}
                      class="size-8"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <span class="text-[#47484c] text-xs">Baixe o app</span>
              <div class="flex items-center gap-6">
                <div class="flex flex-col gap-2">
                  <a
                    href={googlePlayLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon id="google-play-badge" width={120} height={36} />
                  </a>
                  <a
                    href={appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon id="app-store-badge" width={120} height={40} />
                  </a>
                </div>

                <img
                  src={appStoreQrCode}
                  alt=""
                  loading="lazy"
                  width={72}
                  height={72}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full bg-[#0c881e] p-5 text-xs text-white flex flex-col lg:flex-row justify-center lg:items-center gap-x-8">
        {footerBottomTexts.map((text) => <span>{text}</span>)}
      </div>
    </footer>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;

export default Footer;
