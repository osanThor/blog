import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-10 py-10">
        <Image
          className="dark:invert object-cover max-w-[calc(100%-32px)]"
          src="/logo.svg"
          alt="Give's log logo"
          width={320}
          height={38}
          priority
        />
        <ul className="w-full py-4 flex items-center justify-center gap-4 border-t border-b border-neutral-300 dark:border-neutral-500">
          <li>tag1</li>
          <li>tag2</li>
          <li>tag3</li>
          <li>tag4</li>
          <li>tag5</li>
          <li>tag6</li>
        </ul>
      </div>
    </>
  );
}
