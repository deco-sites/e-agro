import type { JSX } from "preact";
import { clx } from "site/sdk/clx.ts";

interface Props extends JSX.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  variant?: "blue" | "black";
}

export default function Title({ title, variant, ...rest }: Props) {
  return (
    <h2
      {...rest}
      class={clx(
        variant === "black"
          ? "text-black text-[22px] font-semibold"
          : "text-[#0670bf] text-lg font-bold",
        rest.class as string,
      )}
    >
      {title}
    </h2>
  );
}
