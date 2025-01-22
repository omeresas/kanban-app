import Logo from "@/components/layout/Logo";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

function App() {
  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Logo className="col-start-1 row-start-1 bg-blue-200" />
      <Header className="col-start-2 row-start-1 bg-red-200" />
      <Sidebar className="col-start-1 row-start-2 bg-yellow-200" />
      <Header className="col-start-2 row-start-2 bg-purple-200" />
    </div>
  );
}

export default App;
