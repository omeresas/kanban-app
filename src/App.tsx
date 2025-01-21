import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="bg-slate-200 p-4 space-y-4">
      <Button variant="default" size="default">
        Default Button
      </Button>
      <Button variant="destructive" size="sm">
        Destructive Button
      </Button>
      <Button variant="outline" size="lg">
        Outline Button
      </Button>
      <Button variant="secondary" size="default">
        Secondary Button
      </Button>
      <Button variant="ghost" size="sm">
        Ghost Button
      </Button>
      <Button variant="link" size="lg">
        Link Button
      </Button>
    </div>
  );
}

export default App;
