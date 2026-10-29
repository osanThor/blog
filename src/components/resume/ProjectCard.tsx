import { Project } from "#site/content";
import { formatPeriod } from "@/services/resume.service.velite";
import Link from "next/link";
import GithubIcon from "../common/icons/GithubIcon";
import HomeIcon from "../common/icons/HomeIcon";
import StackTags from "./StackTags";

type Props = {
  item: Project;
};
export default function ProjectCard({ item }: Props) {
  return (
    <li className="flex flex-col gap-3 p-5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-pretty break-keep">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
          <span className="text-xs md:text-sm font-medium text-neutral-500">
            {formatPeriod(item.start, item.end)}
            {!!item.role && ` · ${item.role}`}
          </span>
        </div>
        <div className="flex gap-2 text-lg shrink-0">
          {!!item.link && (
            <Link href={item.link} target="_blank" aria-label="서비스 바로가기">
              <HomeIcon />
            </Link>
          )}
          {!!item.github && (
            <Link href={item.github} target="_blank" aria-label="Github">
              <GithubIcon />
            </Link>
          )}
        </div>
      </div>
      <p className="text-neutral-600 dark:text-neutral-300">{item.summary}</p>
      {!!item.highlights.length && (
        <ul className="list-disc pl-5 flex flex-col gap-1 text-sm md:text-base">
          {item.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      <div className="mt-auto">
        <StackTags items={item.stack} />
      </div>
    </li>
  );
}
