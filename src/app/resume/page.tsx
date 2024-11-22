import BigTitle from "@/components/common/BigTitle";
import { getMetadata } from "@/utils/getMetadata";
export async function generateMetadata() {
  return getMetadata({ title: "Resume" });
}
export default function ResumePage() {
  return (
    <div>
      <BigTitle text="👋 FE Developer" />
    </div>
  );
}
