import { useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

import Logo from "@/components/Logo/Logo";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Board from "@/components/Board/Board";
import useKanbanStore from "@/store/store";

import { ThemeProvider } from "@/components/theme/theme-provider";

function App() {
  const [selectedBoardId, setSelectedBoardId] =
    useState<UniqueIdentifier | null>(0);
  const boards = useKanbanStore((state) => state.boards);
  const selectedBoard = boards.find((board) => board.id === selectedBoardId);

  return (
    <ThemeProvider>
      <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
        <Logo className="col-start-1 row-start-1" />
        <Header className="col-start-2 row-start-1" />
        <Sidebar
          className="col-start-1 row-start-2"
          selectedBoardId={selectedBoardId}
          setSelectedBoardId={setSelectedBoardId}
        />
        {selectedBoard ? (
          <Board className="col-start-2 row-start-2" board={selectedBoard} />
        ) : (
          <div className="col-start-2 row-start-2 flex items-center justify-center text-xl">
            No boards available. Please add a new board.
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
