export default function Tooltip({
  text,
  pos = "bottom",
}: {
  text: string;
  pos: "top" | "bottom";
}) {
  return (
    <span
      className={`${
        pos === "bottom" ? "top-full" : "top-0 -translate-y-full"
      } pointer-events-none z-[999] whitespace-nowrap py-1 px-2 rounded dark:shadow-neutral-700 left-1/2 -translate-x-1/2 shadow-lg text-sm inline-block absolute bg-white dark:bg-neutral-800 opacity-0 group-hover:opacity-100 transition-all duration-200`}
    >
      {text}
    </span>
  );
}
