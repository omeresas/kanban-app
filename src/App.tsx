import Logo from "@/components/Logo/Logo";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Board from "@/components/Board/Board";

import { ThemeProvider } from "@/components/theme/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-app-border grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-0.25">
        <Logo className="col-start-1 row-start-1" />
        <Header className="col-start-2 row-start-1" />
        <Sidebar className="col-start-1 row-start-2" />
        <Board className="col-start-2 row-start-2" />
      </div>
    </ThemeProvider>
  );
}

export default App;
