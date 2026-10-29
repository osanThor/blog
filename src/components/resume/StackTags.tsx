type Props = {
  items: string[];
};
export default function StackTags({ items }: Props) {
  if (!items.length) return null;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="text-xs md:text-sm font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
