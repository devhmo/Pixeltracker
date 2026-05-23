interface GlobalProgressProps {
  totalPixels: number;
  totalTarget: number;
}

export default function GlobalProgress({ totalPixels, totalTarget }: GlobalProgressProps) {
  const progressPercentage = totalTarget > 0 ? Math.min((totalPixels / totalTarget) * 100, 100) : 0;
  
  return (
    <div className="global-stats-wrapper">
      <div className="global-stats-header">Global Progress</div>
      <div className="global-progress-bar-container">
        <div 
          className="global-progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="global-stats-values">
        <span>{totalPixels.toLocaleString()} pixels</span>
        <span>{totalTarget.toLocaleString()} target</span>
      </div>
    </div>
  );
}