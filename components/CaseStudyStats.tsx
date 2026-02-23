interface Stat {
  label: string;
  value: string;
  description?: string;
}

interface CaseStudyStatsProps {
  stats: Stat[];
}

export default function CaseStudyStats({ stats }: CaseStudyStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6 space-y-2"
        >
          <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            {stat.value}
          </p>
          {stat.description && (
            <p className="text-gray-500 text-xs">{stat.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
