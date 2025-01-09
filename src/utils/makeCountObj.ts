import { Post as PostType } from "#site/content";

export default function makeCountObj(list: PostType[], type: "series" | "tag") {
  const targetMap = new Map<string, number>();
  if (type === "series") {
    list
      .filter((item) => !!item.series)
      .forEach((item) => {
        if (item.series)
          targetMap.set(item.series, (targetMap.get(item.series) || 0) + 1);
      });
  } else {
    list.forEach((item) => {
      item.tags.forEach((tag) => {
        targetMap.set(tag, (targetMap.get(tag) || 0) + 1);
      });
    });
  }
  return Array.from(targetMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko-KR"));
}
