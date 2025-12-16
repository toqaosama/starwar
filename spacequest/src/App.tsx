import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import CharactersPagee from "./components/features/characters/CharactersPage";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersPagee />} />
          <Route path="*" element={<div className="text-gray-300">Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
