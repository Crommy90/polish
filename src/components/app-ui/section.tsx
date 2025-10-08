type SectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export function Section(props?: SectionProps) {
  return <section {...props} />;
}
