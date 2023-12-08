import CenteredBox from "@components/server/CenteredBox";

export default async function ClockPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CenteredBox>{children}</CenteredBox>;
}
