import { Skill } from "#site/content";
import StackTags from "./StackTags";

type Props = {
  list: Skill[];
};
export default function SkillList({ list }: Props) {
  return (
    <dl className="flex flex-col gap-4">
      {list.map((skill) => (
        <div
          key={skill.category}
          className="flex flex-col md:flex-row gap-2 md:gap-8"
        >
          <dt className="md:w-40 shrink-0 font-bold">{skill.category}</dt>
          <dd>
            <StackTags items={skill.items} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
