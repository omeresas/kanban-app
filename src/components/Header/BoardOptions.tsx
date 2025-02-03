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

type BoardOptionsProps = {
  boardId: UniqueIdentifier;
};

const BoardOptions = ({ boardId }: BoardOptionsProps) => {
  const dispatch = useKanbanStore((state) => state.dispatch);

  const handleDeleteBoard = () => {
    dispatch({
      type: "deleteBoard",
      payload: { boardId },
    });
  };

  return (
    <AlertDialog>
      {/* The dropdown menu is nested inside the AlertDialog.Root */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            {/* Wrap the DropdownMenuItem in an AlertDialogTrigger */}
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                Delete Board
                <Trash2 className="h-4 w-4" color="red" />
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      {/* The AlertDialog content is rendered via a portal */}
      <AlertDialogPortal>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              board and all of its columns and tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBoard}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

export default BoardOptions;
