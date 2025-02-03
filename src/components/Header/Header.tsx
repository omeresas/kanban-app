import { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "../theme/ThemeToggle";
import BoardOptions from "./BoardOptions";
import type { Board } from "@/store/types";

type HeaderProps = ComponentPropsWithRef<"div"> & {
  selectedBoard?: Board;
};

const Header = ({ selectedBoard, className, ...props }: HeaderProps) => {
  return (
    <div
      className={cn(
        "bg-header-sidebar-background text-header-sidebar-foreground flex items-center justify-start",
        className,
      )}
      {...props}
    >
      <div className="flex w-[calc(100vw-255px)] items-center justify-between">
        <h1 className="ml-10 text-2xl font-bold">{selectedBoard?.name}</h1>
        <div className="mr-10 flex gap-2">
          {selectedBoard && <BoardOptions boardId={selectedBoard.id} />}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

Header.displayName = "Header";

export default Header;
