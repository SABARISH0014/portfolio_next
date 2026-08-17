export default function ProjectsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div data-view-transition-project-shell>{children}</div>;
}
