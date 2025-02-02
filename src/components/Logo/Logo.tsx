import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

import { Kanban } from "lucide-react";

type LogoProps = ComponentPropsWithoutRef<"div">;

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div
      className={cn(
        "bg-background flex items-center gap-2 px-10 py-10",
        className,
      )}
      {...props}
    >
      <Kanban size={36} strokeWidth={3.5} />
      <span className="text-4xl font-bold">Kanban</span>
    </div>
  );
};

Logo.displayName = "Logo";

export default Logo;
