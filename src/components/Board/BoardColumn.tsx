const BoardColumn = ({ title, tasks }: { title: string; tasks: string[] }) => {
  return (
    <div className="flex flex-col bg-gray-800 p-4 shadow-md">
      <h2 className="mb-4 text-lg font-bold text-gray-200">{title}</h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="rounded-md bg-gray-700 p-3 text-gray-200 shadow-sm transition hover:bg-gray-600"
          >
            {task}
          </div>
        ))}
      </div>
    </div>
  );
};

const NewColumnButton = () => {
  return (
    <button className="flex items-center justify-center rounded-lg bg-gray-700 p-4 text-gray-400 shadow-md transition hover:bg-gray-600">
      + New Column
    </button>
  );
};

export { BoardColumn, NewColumnButton };
