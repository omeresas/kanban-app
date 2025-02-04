import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogPortal,
} from "@/components/ui/alert-dialog";
import useKanbanStore from "@/store/store";
import { UniqueIdentifier } from "@dnd-kit/core";

type ColumnOptionsProps = {
  boardId: UniqueIdentifier;
  columnId: UniqueIdentifier;
};

const ColumnOptions = ({ boardId, columnId }: ColumnOptionsProps) => {
  const dispatch = useKanbanStore((state) => state.dispatch);

  const handleDeleteColumn = () => {
    dispatch({
      type: "deleteColumn",
      payload: { boardId, columnId },
    });
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                Delete Column
                <Trash2 className="h-4 w-4" color="red" />
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <AlertDialogPortal>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              column and all of its tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteColumn}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

ColumnOptions.displayName = "ColumnOptions";

export default ColumnOptions;
