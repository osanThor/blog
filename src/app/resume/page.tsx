import BigTitle from "@/components/common/BigTitle";
import SocialLinks from "@/components/common/SocialLinks";
import ExperienceList from "@/components/resume/ExperienceList";
import ProjectCard from "@/components/resume/ProjectCard";
import ResumeSection from "@/components/resume/ResumeSection";
import SkillList from "@/components/resume/SkillList";
import {
  getExperiences,
  getProfile,
  getProjects,
  getSkills,
} from "@/services/resume.service.velite";
import { getMetadata } from "@/utils/getMetadata";

export async function generateMetadata() {
  const profile = getProfile();
  return getMetadata({
    title: "Resume",
    description: profile.intro.join(" "),
    asPath: "/resume",
  });
}

export default function ResumePage() {
  const profile = getProfile();
  const experiences = getExperiences();
  const projects = getProjects();
  const skills = getSkills();

  return (
    <>
      <BigTitle text={profile.title} />
      <div className="my-10 pb-10 border-b border-neutral-300 dark:border-neutral-500">
        <div className="flex flex-col items-start gap-4 text-pretty break-keep">
          <h2 className="text-2xl ">
            {profile.name} <b>({profile.nameEn})</b>
          </h2>
          <p>
            {profile.intro.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </p>
          <SocialLinks />
        </div>
      </div>
      {!!experiences.length && (
        <ResumeSection id="experience" title="Experience">
          <ExperienceList list={experiences} />
        </ResumeSection>
      )}
      {!!projects.length && (
        <ResumeSection id="projects" title="Projects">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.href} item={project} />
            ))}
          </ul>
        </ResumeSection>
      )}
      {!!skills.length && (
        <ResumeSection id="skills" title="Skills">
          <SkillList list={skills} />
        </ResumeSection>
      )}
    </>
  );
}
