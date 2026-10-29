import { profile, experiences, skills, projects } from "#site/content";

// "YYYY.MM" 문자열은 사전순 비교로 정렬 가능
export const getProfile = () => profile;

export const getExperiences = () =>
  [...experiences].sort((a, b) => b.start.localeCompare(a.start));

export const getSkills = () => skills;

export const getProjects = () =>
  projects
    .filter((project) => !project.draft)
    .sort((a, b) => a.order - b.order || b.start.localeCompare(a.start));

export const formatPeriod = (start: string, end?: string) =>
  `${start} - ${end ?? "현재"}`;
