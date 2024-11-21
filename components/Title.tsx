interface Props {
  title: string;
}

export default function Title({ title }: Props) {
  return <h2 class="text-[#0670bf] text-lg font-bold">{title}</h2>;
}
