export const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
      <div className="w-20 h-4 bg-slate-100 rounded"></div>
    </div>
    <div className="w-2/3 h-6 bg-slate-100 rounded mb-2"></div>
    <div className="w-1/2 h-4 bg-slate-50 rounded"></div>
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-pulse h-64 flex items-end gap-3 px-8">
    {[...Array(6)].map((_, i) => (
      <div 
        key={i} 
        className="flex-1 bg-slate-100 rounded-t-lg" 
        style={{ height: `${Math.random() * 60 + 20}%` }}
      ></div>
    ))}
  </div>
);
