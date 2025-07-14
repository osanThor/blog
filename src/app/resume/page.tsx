import BigTitle from "@/components/common/BigTitle";
import { getMetadata } from "@/utils/getMetadata";
import Image from "next/image";
// import SocialLinks from "@/components/common/SocialLinks";

export async function generateMetadata() {
  return getMetadata({ title: "Resume" });
}

export default function ResumePage() {
  return (
    <>
      <BigTitle text="👋 FE Developer" />
      <div className="my-10 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row gap-7 items-center md:border-b border-neutral-300 dark:border-neutral-500">
          <Image
            src={"/me2.png"}
            alt="it's me"
            width={350}
            height={400}
            priority
          />
          <div className="flex flex-col md:items-start gap-4 text-pretty break-keep">
            <h2 className="text-2xl ">
              이준영 <b>(Lee Junyoung)</b>
            </h2>
            <p>
              프론트엔드 개발자 이준영입니다.
              <br />
              데이터를 어떻게 해야 빠르고 효율적이게 노출할 수 있는지
              고민합니다.
              <br />
              이해하기 쉬운 코드와 빠른 문제 해결로 퍼포먼스를 높여 팀과 기업에
              이익을 내는 것을 최우선으로 생각합니다. <br />
              기술적 도약를 목표로 여러 프로젝트를 진행하며 개발자로서 책임감이
              강하며 오너십을 가지고 있습니다.
            </p>
            {/* <SocialLinks /> */}
          </div>
        </div>
      </div>
    </>
  );
}
