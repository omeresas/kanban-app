import React, { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type HeaderProps = ComponentPropsWithRef<"div"> & {
  boardTitle?: string;
};

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ boardTitle = "Board Title", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-evenly", className)}
        {...props}
      >
        <h1 className="text-2xl font-bold">{boardTitle}</h1>
        <div className="flex gap-2">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </div>
      </div>
    );
  },
);

Header.displayName = "Header";

export default Header;
