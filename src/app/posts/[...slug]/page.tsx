import BigTitle from "@/components/common/BigTitle";
import SmallTitle from "@/components/common/SmallTitle";
import { getPostsByCategory } from "@/services/posts.service";
import Link from "next/link";

type Props = {
  params: { slug: string[] };
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
    <div>
      <BigTitle text={category} />
      <p className="mb-7 text-lg text-neutral-600 dark:text-neutral-300">
        {messages[category as "dev" | "life"]}
      </p>
      <SmallTitle text={"All Posts"} count={list.length} />
      {!!list.length ? (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {list.map((item) => (
            <li key={item.title} className="group">
              <Link
                href={`/post/${item.href}`}
                className="flex flex-col transition-all group-hover:shadow-md"
              >
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="truncate">{item.description}</p>
                {item.date}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full flex items-center justify-center h-[300px] text-lg font-medium text-neutral-600 dark:text-neutral-300">
          게시물이 없습니다.
        </div>
      )}
    </div>
  );
}
