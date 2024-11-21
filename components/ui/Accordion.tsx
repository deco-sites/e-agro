import { JSX } from "preact";

export interface AccordionProps extends JSX.HTMLAttributes<HTMLDivElement> {
  id: string;
  header: JSX.Element;
  children: JSX.Element;
  open?: boolean;
}

export function Accordion(
  { id, header, children, open, class: className, ...props }: AccordionProps,
) {
  return (
    <div class={`custom-accordion ${className || ""}`} {...props}>
      <input
        class="custom-accordion-input hidden"
        type="checkbox"
        id={id}
        checked={open}
      />
      <label class="custom-accordion-title" htmlFor={id}>{header}</label>
      <div class="custom-accordion-body">
        <div class="custom-accordion-wrapper">{children}</div>
      </div>
    </div>
  );
}
