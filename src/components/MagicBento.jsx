import { FaStar } from 'react-icons/fa6';

const MagicBento = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col gap-4 hover:-translate-y-1"
        >
          <div className="flex items-center gap-3">
            <div className="p-[2px] rounded-full" style={{ background: 'var(--gradient-qriblik)' }}>
              <img 
                className='w-12 h-12 object-cover rounded-full block' 
                src={feature.image} 
                alt={feature.title} 
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 hover:text-[#8B3FDE] transition-colors duration-200">
                {feature.title}
              </h3>
              <div className="flex gap-0.5 text-amber-400 mt-1">
                {[...Array(feature.rating)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed">
            "{feature.description}"
          </p>
        </div>
      ))}
    </div>
  );
};
export default MagicBento;