import { useState, useEffect } from 'react';
import api from '../services/api';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

interface AnalyticsData {
  totalPageviews: number;
  uniqueSessions: number;
  topPages: {
    allTime: { path: string; views: number }[];
    last7Days: { path: string; views: number }[];
  };
  topReferrers: { referrer: string; views: number }[];
  dailyTrend: { date: string; views: number }[];
}

function Sparkline({ data, height = 48 }: { data: { date: string; views: number }[]; height?: number }) {
  if (data.length === 0) return <p className="text-text-muted text-sm">No data yet</p>;

  const maxViews = Math.max(...data.map(d => d.views), 1);
  const width = 100;
  const points = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * width;
    const y = height - (d.views / maxViews) * (height - 4);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--neon-cyan)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#sparkGrad)" />
      <polyline
        points={points}
        fill="none"
        stroke="var(--neon-cyan)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card-neon p-4 text-center">
      <p className="text-2xl font-bold text-accent-heading">{value.toLocaleString()}</p>
      <p className="text-sm text-text-muted mt-1">{label}</p>
    </div>
  );
}

function PageTable({ title, pages }: { title: string; pages: { path: string; views: number }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">{title}</h3>
      {pages.length === 0 ? (
        <p className="text-text-muted text-sm">No data yet</p>
      ) : (
        <div className="space-y-1">
          {pages.map((p, i) => (
            <div key={p.path} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-hover transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs text-text-muted w-5 text-right flex-shrink-0">{i + 1}.</span>
                <span className="text-sm text-text-primary truncate">{p.path}</span>
              </div>
              <span className="text-sm font-medium text-neon-cyan flex-shrink-0 ml-4">{p.views.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await api.get<AnalyticsData>('/admin/analytics');
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return <ErrorMessage message="No analytics data available" />;

  return (
    <article className="space-y-8 max-w-4xl">
      <h1 className="heading-neon-primary">
        Analytics
        <span className="text-lg text-text-muted font-normal ml-3">
          blog.petedillo.com
        </span>
      </h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total Pageviews" value={data.totalPageviews} />
        <StatCard label="Unique Sessions" value={data.uniqueSessions} />
      </div>

      {/* Daily Trend */}
      <div className="card-neon p-5">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
          Daily Views — Last 30 Days
        </h3>
        <Sparkline data={data.dailyTrend} height={64} />
        {data.dailyTrend.length > 0 && (
          <div className="flex justify-between mt-2 text-xs text-text-muted">
            <span>{data.dailyTrend[0].date}</span>
            <span>{data.dailyTrend[data.dailyTrend.length - 1].date}</span>
          </div>
        )}
      </div>

      {/* Top Pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-neon p-5">
          <PageTable title="Top Pages — All Time" pages={data.topPages.allTime} />
        </div>
        <div className="card-neon p-5">
          <PageTable title="Top Pages — Last 7 Days" pages={data.topPages.last7Days} />
        </div>
      </div>

      {/* Top Referrers */}
      <div className="card-neon p-5">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Top Referrers</h3>
        {data.topReferrers.length === 0 ? (
          <p className="text-text-muted text-sm">No referrer data yet</p>
        ) : (
          <div className="space-y-1">
            {data.topReferrers.map((r) => (
              <div key={r.referrer} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-hover transition-colors">
                <span className="text-sm text-text-primary truncate">{r.referrer}</span>
                <span className="text-sm font-medium text-neon-cyan flex-shrink-0 ml-4">{r.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
