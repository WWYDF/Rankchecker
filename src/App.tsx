import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <HeroUIProvider>
      <div className="min-h-screen bg-slate-800 text-zinc-200">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">Tailwindcss testing :p</h1>
        </main>
      </div>
    </HeroUIProvider>
  );
}

export default App;