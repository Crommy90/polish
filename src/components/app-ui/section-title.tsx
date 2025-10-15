import { Separator } from "@radix-ui/themes";
import React from "react";

interface SectionTitleProps extends React.ComponentProps<"h2"> {
  level?: number
}

export function SectionTitle(props: SectionTitleProps) {
  const { level, ...rest } = { ...props };
  if (level == 0 || level == undefined) {
    return (
      <div className="min-w-md w-max">
        <h2 {...rest} />
        <Separator size={'4'} />
      </div>
    );
  }
  else if( level == 1) {
    return <h3 {...props}  />;
  }
  else if( level == 2) {
    return <h4 {...props}  />;
  }
  return <h5 {...props} />
}
