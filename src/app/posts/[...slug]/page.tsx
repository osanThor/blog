import BigTitle from "@/components/common/BigTitle";
import SmallTitle from "@/components/common/SmallTitle";
import { getPostsByCategory } from "@/services/posts.service";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const messages = {
  dev: "새로 알게 된 지식, 트러블 슈팅 등 개발 일지를 기록한 공간입니다.",
  life: "소소한 일상 모음입니다.",
};

export default async function PostsByCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = slug[0];
  const list = await getPostsByCategory(category);
  return (
    <>
      <BigTitle text={category} />
      <p className="mb-7 text-sm md:text-base lg:text-lg text-neutral-600 dark:text-neutral-300">
        {messages[category as "dev" | "life"]}
      </p>
      <SmallTitle text={"All Posts"} count={list.length} />
      {!!list.length ? (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {list.map((item) => (
            <li
              key={item.title}
              className="group flex flex-col content-visibility-auto contain-intrinsic-size-[auto_1000px]"
            >
              <Link
                href={`/post/${category}/${item.href}`}
                className="flex flex-col transition-all flex-grow"
              >
                {!!item.cover && (
                  <div className="overflow-hidden h-[100vw] max-h-[300px] sm:max-h-[230px] lg:max-h-[210px] rounded-lg mb-2 relative">
                    <Image
                      className="object-cover w-full group-hover:scale-[1.1] transition-all duration-200"
                      src={item.cover}
                      alt={`cover-of-${item.title}`}
                      fill
                      sizes={"1"}
                      priority
                    />
                  </div>
                )}
                <span className="text-xs md:text-sm font-medium text-yellow-600">
                  {item.tags.join(" & ")}
                </span>
                <h2 className="text-xl font-bold mb-2 text-pretty flex-grow flex">
                  {item.title}
                </h2>
                <div className="w-full flex items-center gap-2 justify-between">
                  <span className="text-xs md:text-sm font-medium text-neutral-500 ">
                    {item.date}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full flex items-center justify-center h-[300px] text-lg font-medium text-neutral-600 dark:text-neutral-300">
          게시물이 없습니다.
        </div>
      )}
    </>
  );
}
