import Image, { ImageProps } from "next/image";

export default function Img(props: ImageProps) {
  return (
    <Image
      placeholder="blur"
      blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMszNSvBwAD5gGKUzJs/wAAAABJRU5ErkJggg=="
      {...props}
    />
  );
}
