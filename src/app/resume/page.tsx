import BigTitle from "@/components/common/BigTitle";
import { getMetadata } from "@/utils/getMetadata";
export async function generateMetadata() {
  return getMetadata({ title: "Resume" });
}
export default function ResumePage() {
  return (
    <>
      <BigTitle text="👋 FE Developer" />
      <div className="my-7 h-full text-2xl flex items-center justify-center">
        준비 중입니다. 🫡
      </div>
    </>
  );
}
