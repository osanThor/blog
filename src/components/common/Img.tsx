import Image, { ImageProps } from "next/image";

export default function Img(props: ImageProps) {
  return (
    <picture>
      <source src={props.src as string} />
      <Image {...props} />
    </picture>
  );
}
