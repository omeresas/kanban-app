import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useKanbanStore from "@/store/store";
import { useOnClickOutside } from "usehooks-ts"; // Import the hook from usehooks-ts

const AddColumn = () => {
  const selectedBoardId = useKanbanStore((state) => state.selectedBoardId)!;
  const dispatch = useKanbanStore((state) => state.dispatch);
  const [isEditing, setIsEditing] = useState(false);
  const [columnName, setColumnName] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddColumn = () => {
    if (!columnName.trim()) return;
    dispatch({
      type: "addColumn",
      payload: { boardId: selectedBoardId, name: columnName },
    });
    setColumnName("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setColumnName("");
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddColumn();
    } else if (event.key === "Escape") {
      event.preventDefault();
      handleCancel();
    }
  };

  // Use the hook to detect clicks outside the container.
  useOnClickOutside(containerRef, () => {
    if (isEditing) {
      handleCancel();
    }
  });

  if (!isEditing) {
    return (
      <Button onClick={() => setIsEditing(true)} variant="add_column">
        <Plus strokeWidth={3} className="pt-[1px]" /> Add Column
      </Button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-column-background flex flex-col gap-2 rounded-md p-4 shadow-md"
    >
      <Input
        placeholder="Enter column name"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className="flex justify-start gap-2">
        <Button onClick={handleAddColumn}>Add Column</Button>
        <Button onClick={handleCancel} variant="add_column_cancel">
          <X strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

export default AddColumn;
