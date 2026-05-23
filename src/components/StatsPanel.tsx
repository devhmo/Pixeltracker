interface StatsPanelProps {
  totalAccounts: number;
  completedAccounts: number;
  totalPixels: number;
  totalTarget: number;
}

export default function StatsPanel({ 
  totalAccounts, 
  completedAccounts, 
  totalPixels, 
  totalTarget 
}: StatsPanelProps) {
  const completionRate = totalTarget > 0 ? Math.round((totalPixels / totalTarget) * 100) : 0;
  
  return (
    <div className="stats-panel">
      <div className="stat-card">
        <div className="stat-value">{totalAccounts}</div>
        <div className="stat-label">Total Accounts</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{completedAccounts}</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{totalPixels.toLocaleString()}</div>
        <div className="stat-label">Total Pixels</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{completionRate}%</div>
        <div className="stat-label">Completion Rate</div>
      </div>
    </div>
  );
}