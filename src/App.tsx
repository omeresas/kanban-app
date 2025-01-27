import { useState } from "react";
import Logo from "@/components/Logo/Logo";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Board from "@/components/Board/Board";
import useKanbanStore from "@/store/store";

function App() {
  const [selectedBoardId, setSelectedBoardId] = useState<number>(0); // Initial board ID (default to first board)
  const boards = useKanbanStore((state) => state.boards); // Fetch boards from the store
  const boardNamesIds = boards.map((board) => ({
    id: board.id,
    name: board.name,
  })); // Extract board names and IDs

  // Find the selected board based on the selectedBoardId
  const selectedBoard = boards.find((board) => board.id === selectedBoardId);

  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Logo className="col-start-1 row-start-1 bg-blue-200" />
      <Header className="col-start-2 row-start-1 bg-red-200" />
      {/* Pass state to Sidebar */}
      <Sidebar
        className="col-start-1 row-start-2 bg-yellow-200"
        boardNamesIds={boardNamesIds}
        selectedBoardId={selectedBoardId}
        setSelectedBoardId={setSelectedBoardId}
      />
      {/* Pass selected board to Board */}
      {selectedBoard ? (
        <Board
          className="col-start-2 row-start-2 bg-purple-200"
          board={selectedBoard}
        />
      ) : (
        <div className="col-start-2 row-start-2 flex items-center justify-center text-xl">
          Select a board to view its contents.
        </div>
      )}
    </div>
  );
}

export default App;
