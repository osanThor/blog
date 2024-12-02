import Image, { ImageProps } from "next/image";

export default function Img(props: ImageProps) {
  return (
    <Image
      {...props}
      placeholder="blur"
      blurDataURL={
        props.blurDataURL ||
        "data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8VQ8AAlkBa3ROiyoAAAAASUVORK5CYII="
      }
    />
  );
}
