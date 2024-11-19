"use client";
type Props = {
  text: string;
};
export default function BigTitle({ text }: Props) {
  return (
    <div className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-3">
      {text}
    </div>
  );
}
