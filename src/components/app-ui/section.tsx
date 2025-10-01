export function Section({
  children,
  ...props
}: {
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
  children?: React.ReactNode;
}) {
  return <section {...props}>{children}</section>;
}
