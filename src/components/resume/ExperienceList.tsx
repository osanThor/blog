import { Experience } from "#site/content";
import { formatPeriod } from "@/services/resume.service.velite";
import StackTags from "./StackTags";

type Props = {
  list: Experience[];
};
export default function ExperienceList({ list }: Props) {
  return (
    <ul className="flex flex-col gap-10">
      {list.map((item) => (
        <li
          key={`${item.company}-${item.start}`}
          className="flex flex-col md:flex-row gap-2 md:gap-8"
        >
          <span className="md:w-40 shrink-0 text-sm md:text-base font-medium text-neutral-500">
            {formatPeriod(item.start, item.end)}
          </span>
          <div className="flex flex-col gap-3 text-pretty break-keep">
            <div>
              <h3 className="text-lg md:text-xl font-bold">{item.company}</h3>
              <p className="text-sm md:text-base text-yellow-600 font-medium">
                {item.role}
              </p>
            </div>
            {!!item.summary && (
              <p className="text-neutral-600 dark:text-neutral-300">
                {item.summary}
              </p>
            )}
            {!!item.highlights.length && (
              <ul className="list-disc pl-5 flex flex-col gap-1">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            <StackTags items={item.stack} />
          </div>
        </li>
      ))}
    </ul>
  );
}
