import { FaStar } from 'react-icons/fa6';
import { useTheme } from "../contexts/ThemeContext";

const MagicBento = ({ features }) => {
  const { dark } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature) => (
        <div
          key={feature.id}
          className={`rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col gap-4 hover:-translate-y-1 ${dark
              ? "bg-[#150d27] border-white/6 hover:shadow-[0_4px_24px_rgba(139,63,222,0.12)]"
              : "bg-white border-gray-100"
            }`}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-[2px] rounded-full flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#8B3FDE,#C837AB,#FF6B35)" }}
            >
              <img
                className="w-12 h-12 object-cover rounded-full block"
                src={feature.image}
                alt={feature.title}
              />
            </div>
            <div className="flex-1">
              <h3
                className={`text-lg font-bold hover:text-[#8B3FDE] transition-colors duration-200 ${dark ? "text-purple-50" : "text-gray-900"
                  }`}
              >
                {feature.title}
              </h3>
              <div className="flex gap-0.5 text-amber-400 mt-1">
                {[...Array(Math.min(feature.rating, 5))].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
            </div>
          </div>

          <p
            className={`text-sm leading-relaxed ${dark ? "text-purple-200/60" : "text-gray-500"
              }`}
          >
            "{feature.description}"
          </p>
        </div>
      ))}
    </div>
  );
};

export default MagicBento;