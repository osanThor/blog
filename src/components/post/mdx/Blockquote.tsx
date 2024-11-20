import FireIcon from "@/components/common/icons/FireIcon";
import InfoIcon from "@/components/common/icons/InfoIcon";
import QuestionIcon from "@/components/common/icons/QuestionIcon";
import WarnIcon from "@/components/common/icons/WarnIcon";
import { PropsWithChildren } from "react";

type Props = {
  type?: "info" | "warn" | "error";
} & PropsWithChildren;

export default function Blockquote({ type, children }: Props) {
  const blockquoteClass = {
    info: "bg-blue-100 text-indigo-800 [&_a]:!text-indigo-800",
    warn: "bg-yellow-100 text-yellow-800 [&_a]:!text-yellow-800",
    error: "bg-red-100 text-red-800 [&_a]:!text-red-800",
    default: "bg-neutral-200 text-neutral-800 [&_a]:!text-neutral-800",
  }[type || "default"];

  const BlockquoteIcon = {
    info: InfoIcon,
    warn: WarnIcon,
    error: FireIcon,
    default: QuestionIcon,
  }[type || "default"];

  return (
    <blockquote
      className={`${blockquoteClass} rounded-lg py-4 px-5 mt-4 flex items-center`}
    >
      <span className="text-2xl mr-4">
        <BlockquoteIcon />
      </span>
      <div className="[&_p]:m-0 ">{children}</div>
    </blockquote>
  );
}
