import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.get("title");

    const title = hasTitle
      ? decodeURIComponent(hasTitle).slice(0, 100)
      : "GIVEN's LOG";

    return new ImageResponse(
      (
        <div
          tw="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-black"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/meta/thumbnail-bg.png)`,
          }}
        >
          <div tw="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-10">
            <h1 tw="text-7xl font-extrabold text-white">{title}</h1>
          </div>
        </div>
      )
    );
  } catch (err: unknown) {
    return new Response(`Fail to generate OG Image: ${err}`, { status: 500 });
  }
}
