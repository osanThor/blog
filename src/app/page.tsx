import MainContentsContainer from "@/containers/home/MainContentsContainer";
import TopContentsContainer from "@/containers/home/TopContentsContainer";

export default function Home() {
  return (
    <>
      <TopContentsContainer />
      <div className="w-full flex flex-col md:flex-row gap-8 my-10">
        <MainContentsContainer />
        <div className="flex-[1] flex flex-col gap-10">
          <aside>About Me</aside>
        </div>
      </div>
    </>
  );
}
