import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

import { Kanban } from "lucide-react";

type LogoProps = ComponentPropsWithoutRef<"div">;

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div
      className={cn(
        "bg-header-sidebar-background text-header-sidebar-foreground flex items-center gap-2 px-10 py-7",
        className,
      )}
      {...props}
    >
      <Kanban size={36} strokeWidth={3.5} />
      <span className="text-4xl font-bold">Kanban</span>
    </div>
  );
};

export default Logo;
