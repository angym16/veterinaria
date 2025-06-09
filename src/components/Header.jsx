import { Dog } from "lucide-react";
const Header = () => {
  return (
    <header className="bg-cyan-100 shadow-md rounded-2xl p-6 mx-auto max-w-4xl mt-10 flex items-center gap-4">
      <div className="flex-shrink-0 bg-cyan-50 p-3 rounded-full">
        <Dog className="text-cyan-700 w-8 h-8" />
      </div>
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">MascotiLove</h1>
        <p className="text-cyan-700 text-lg font-semibold">Veterinaria</p>
      </div>
    </header>
  )
}

export default Header;

