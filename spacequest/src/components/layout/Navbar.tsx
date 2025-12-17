import { NavLink } from "react-router-dom"
import { User, Rocket, Globe, Film, Dna, Car } from "lucide-react"

type NavItem = {
  name: string
  path: string
  icon: React.ElementType
}

export default function Navbar() {
  const logoColor = "bg-yellow-400"

  const navItems: NavItem[] = [
    { name: "Characters", path: "/characters", icon: User },
    { name: "Starships", path: "/starships", icon: Rocket },
    { name: "Planets", path: "/planets", icon: Globe },
    { name: "Species", path: "/species", icon: Dna },
    { name: "Vehicles", path: "/vehicles", icon: Car },
    { name: "Films", path: "/films", icon: Film },
  ]

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-md font-bold text-gray-900 ${logoColor}`}
          >
            SQ
          </div>
          <span className="text-lg font-semibold tracking-wide">
            SpaceQuest
          </span>
        </div>

        {/* Links */}
        <ul className="flex items-center gap-2">
          {navItems.map(({ name, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? `${logoColor} text-gray-900`
                      : "text-gray-300 hover:bg-yellow-400 hover:text-gray-900",
                  ].join(" ")
                }
              >
                <Icon size={18} />
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
