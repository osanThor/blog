import SmallTitle from "../common/SmallTitle";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
};
export default function ResumeSection({ id, title, children }: Props) {
  return (
    <section id={id} className="w-full scroll-mt-24 mb-14">
      <SmallTitle text={title} />
      {children}
    </section>
  );
}
