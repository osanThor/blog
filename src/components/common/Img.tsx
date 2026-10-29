import Image, { ImageProps } from "next/image";

export default function Img({ alt, ...props }: ImageProps) {
  return <Image alt={alt} {...props} />;
}
