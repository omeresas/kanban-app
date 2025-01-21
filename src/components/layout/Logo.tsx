import { Kanban } from 'lucide-react';

function Logo() {
  return (
    <div className="flex items-center gap-2 bg-pink-200 px-20 py-10 border-r-2 border-gray-500">
      <Kanban size={36} strokeWidth={3.5} />
      <span className="text-4xl font-bold">Kanban</span>
    </div>
  );
}

export default Logo;
