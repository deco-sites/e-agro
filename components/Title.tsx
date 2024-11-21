import type { JSX } from "preact";
import { clx } from "site/sdk/clx.ts";

interface Props extends JSX.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

export default function Title({ title, ...rest }: Props) {
  return (
    <h2
      {...rest}
      class={clx("text-[#0670bf] text-lg font-bold", rest.class as string)}
    >
      {title}
    </h2>
  );
}
