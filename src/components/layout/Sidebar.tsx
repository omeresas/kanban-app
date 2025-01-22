import React, { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type SidebarProps = ComponentPropsWithRef<"aside"> & {
  sidebarTitle?: string;
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ sidebarTitle = "Sidebar Title", className, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-evenly gap-4 bg-teal-200 py-10",
          className,
        )}
        {...props}
      >
        <h1 className="text-2xl font-bold">{sidebarTitle}</h1>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
