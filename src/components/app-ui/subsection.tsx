export type SubSectionProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >


export function SubSection(props?: SubSectionProps){
  return (
    <section
      {...props}
      className={`pt-4 px-4 ${props?.className || ''}`}
    />
  );
}
