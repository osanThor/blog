type Props = {
  params: { slug: string[] };
};
export default function SearchPage({ params: { slug } }: Props) {
  return <div>SearchPage {slug}</div>;
}
