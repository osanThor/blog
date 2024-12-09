import Image, { ImageProps } from "next/image";

export default function Img(props: ImageProps) {
  return <Image {...props} />;
}
