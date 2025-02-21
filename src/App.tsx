import Logo from "@/components/Logo/Logo";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Board from "@/components/Board/Board";

import { ThemeProvider } from "@/components/theme/theme-provider";
import useKanbanStore from "@/store/store";

function App() {
  const selectedBoard = useKanbanStore((state) =>
    state.boards.find((board) => board.id === state.selectedBoardId),
  );

  return (
    <ThemeProvider>
      <div className="bg-app-border grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-0.25">
        <Logo className="col-start-1 row-start-1" />
        <Header className="col-start-2 row-start-1" />
        <Sidebar className="col-start-1 row-start-2" />
        {selectedBoard ? (
          <Board
            className="col-start-2 row-start-2"
            selectedBoard={selectedBoard}
          />
        ) : (
          <div className="col-start-2 row-start-2 flex h-full w-full items-center justify-center">
            <p className="text-muted-foreground text-sm">
              No board selected. Please select a board from the sidebar.
            </p>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
