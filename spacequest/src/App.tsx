import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import CharactersPagee from "./components/features/characters/CharactersPage";
import FilmsPagee from "./components/features/films/FilmsPage";
import StarshipsPage from "./components/features/starships/starships";
import PlanetsPagee from "./components/features/planets/PlanetsPage";
import VehiclesPagee from "./components/features/Vehicles/VehiclesPage";
import SpeciesPagee from "./components/features/species/SpeciesPage";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersPagee />} />
          <Route path="/films" element={<FilmsPagee />} />
          <Route path="/starships" element={<StarshipsPage />} />
          <Route path="/planets" element={<PlanetsPagee />} />
          <Route path="/vehicles" element={<VehiclesPagee />} />
          <Route path="/species" element={<SpeciesPagee />} />

          <Route path="*" element={<div className="text-gray-300">Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
