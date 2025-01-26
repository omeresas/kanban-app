import Logo from "@/components/Logo/Logo";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Board from "@/components/Board/Board";
import useKanbanStore from "./store/store";

function App() {
  const boards = useKanbanStore((state) => state.boards);
  const selectedBoardId = 0;
  const selectedBoard = boards.find(
    (board) => board.id === selectedBoardId,
  ) as Board;
  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Logo className="col-start-1 row-start-1 bg-blue-200" />
      <Header className="col-start-2 row-start-1 bg-red-200" />
      <Sidebar className="col-start-1 row-start-2 bg-yellow-200" />
      <Board
        className="col-start-2 row-start-2 bg-purple-200"
        board={selectedBoard}
      />
    </div>
  );
}

export default App;
