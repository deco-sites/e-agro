import { Head } from "$fresh/runtime.ts";
import { getSrcSet } from "apps/website/components/Image.tsx";
import { createContext, type JSX } from "preact";
import { forwardRef } from "preact/compat";
import { useContext } from "preact/hooks";

interface Context {
  preload?: boolean;
}

const Context = createContext<Context>({
  preload: false,
});

type SourceProps =
  & Omit<JSX.IntrinsicElements["source"], "width" | "height" | "preload">
  & {
    src: string;
    /** @description Improves Web Vitals (CLS|LCP) */
    width: number;
    /** @description Improves Web Vitals (CLS|LCP) */
    height?: number;
    /** @description Web Vitals (LCP). Adds a link[rel="preload"] tag in head. Use one preload per page for better performance */
    preload?: boolean;
    /** @description Improves Web Vitals (LCP). Use high for LCP image. Auto for other images */
    fetchPriority?: "high" | "low" | "auto";
    /** @description Object-fit */
    fit?: "contain" | "cover";
  };

export const SourceWithFitProp = forwardRef<HTMLSourceElement, SourceProps>(
  (props, ref) => {
    const { preload } = useContext(Context);

    const srcSet = getSrcSet(props.src, props.width, props.height, props.fit);
    const linkProps = {
      imagesrcset: srcSet,
      imagesizes: props.sizes,
      fetchpriority: props.fetchPriority,
      media: props.media,
    };

    return (
      <>
        {preload && (
          <Head>
            <link as="image" rel="preload" href={props.src} {...linkProps} />
          </Head>
        )}
        <source
          {...props}
          data-fresh-disable-lock={true}
          preload={undefined}
          src={undefined} // Avoid deprecated api lighthouse warning
          srcSet={srcSet}
          ref={ref}
        />
      </>
    );
  },
);
