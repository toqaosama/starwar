import { NavLink } from "react-router-dom"
import { User, Rocket, Globe, Film, Dna, Car } from "lucide-react"

type NavItem = {
  name: string
  path: string
  icon: React.ElementType
}

export default function Navbar() {
  const navItems: NavItem[] = [
    { name: "Characters", path: "/characters", icon: User },
    { name: "Starships", path: "/starships", icon: Rocket },
    { name: "Planets", path: "/planets", icon: Globe },
    { name: "Species", path: "/species", icon: Dna },
    { name: "Vehicles", path: "/vehicles", icon: Car },
    { name: "Films", path: "/films", icon: Film },
  ]

  return (
    <nav className="w-full border-b border-yellow-400/10 bg-black/70 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo / brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-[0_0_22px_rgba(250,204,21,0.9)] ring-2 ring-yellow-400/70 bg-yellow-400 text-slate-900 font-bold">
            SQ
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-[0.25em] text-yellow-300/80 uppercase">
              SpaceQuest
            </span>
            <span className="text-xs text-gray-400">Galactic Data Command</span>
          </div>
        </div>

        {/* Links */}
        <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1 py-1 shadow-[0_0_0_1px_rgba(15,23,42,0.8)]">
          {navItems.map(({ name, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-yellow-400 text-slate-900 shadow-[0_0_14px_rgba(250,204,21,0.8)]"
                      : "text-gray-300 hover:bg-white/10 hover:text-yellow-300",
                  ].join(" ")
                }
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Player badge / gamified status */}
        <div className="hidden sm:flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-gray-300">
          <div className="flex flex-col">
            <span className="font-semibold text-yellow-300 tracking-wide">Commander</span>
            <span className="text-[10px] text-gray-400">Level 7 • Holonet Access</span>
          </div>

          <div className="relative h-2 w-20 overflow-hidden rounded-full bg-slate-800">
            <div className="absolute inset-y-0 left-0 w-[65%] rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-emerald-300 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
          </div>
        </div>
      </div>
    </nav>
  )
}
