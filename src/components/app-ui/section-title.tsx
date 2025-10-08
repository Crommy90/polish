import { Separator } from "@radix-ui/themes";
import React from "react";

export function SectionTitle(props: React.ComponentProps<"h2">) {
  return (
    <div className="min-w-md w-max">
      <h2 {...props} />
      <Separator size={"4"} />
    </div>
  );
}
