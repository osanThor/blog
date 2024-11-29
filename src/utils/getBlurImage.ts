import { META } from "@/constants/meta";
import { getPlaiceholder } from "plaiceholder";

const getBlurImage = async (imgSrc: string) => {
  try {
    const buffer = await fetch(`${META.url}${imgSrc}`).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch (e) {
    console.error(`${imgSrc}에서 에러`, e);
    return "";
  }
};

export default getBlurImage;
