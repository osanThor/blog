import Image, { ImageProps } from "next/image";

export default function Img(props: ImageProps) {
  return (
    <Image
      {...props}
      placeholder="blur"
      blurDataURL={
        props.blurDataURL ||
        "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcuaS9HgAGJwJV/XWwGgAAAABJRU5ErkJggg=="
      }
    />
  );
}
