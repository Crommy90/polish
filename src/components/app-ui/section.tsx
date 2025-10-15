export interface SectionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  level?: number;
}

export function Section(props?: SectionProps) {
  const {className, level, ...rest} = {...props}
  const sectionLevel = level ?? 0
  const sectionClassName = sectionLevel > 0 ? 'pt-4 px-4 ' + className : className;


  return <section className={sectionClassName} {...rest} />;
}
