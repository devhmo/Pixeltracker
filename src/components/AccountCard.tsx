interface Account {
  id: string;
  name: string;
  pixels: number;
  targetPixels: number;
  lastIP: string;
  lastIPDate: string;
  note: string;
  completed: boolean;
  accentColor: string;
}

interface AccountCardProps {
  account: Account;
  darkMode: boolean;
}

export default function AccountCard({ account, darkMode }: AccountCardProps) {
  const progressPercentage = Math.min((account.pixels / account.targetPixels) * 100, 100);
  
  return (
    <div className={`card account-card ${account.completed ? 'full' : ''}`} style={{ '--accent-color': account.accentColor } as React.CSSProperties}>
      <div className="card-header">
        <div className="card-header-title">
          <h3>{account.name}</h3>
          {account.note && <div className="account-note">{account.note}</div>}
          <div className="account-uid">
            <span className="last-ip-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {account.lastIP}
            </span>
          </div>
        </div>
        <div className="card-header-actions">
          <button className="header-btn" aria-label="More options">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="pixels-display">
        {account.pixels.toLocaleString()} / {account.targetPixels.toLocaleString()} pixels
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ 
            width: `${progressPercentage}%`,
            backgroundColor: account.accentColor
          }}
        ></div>
      </div>
      
      <div className="info-grid">
        <div className="info-item">
          <strong>Progress</strong>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="info-item">
          <strong>Remaining</strong>
          <span>{(account.targetPixels - account.pixels).toLocaleString()}</span>
        </div>
        <div className="info-item">
          <strong>Last IP Date</strong>
          <span>{account.lastIPDate || 'N/A'}</span>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="footer-left">
          <button className="btn btn-edit" aria-label="Edit account">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button className="btn btn-note" aria-label="Add note">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button className="btn btn-ip" aria-label="Update IP">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </button>
        </div>
        <div className="footer-right">
          <button className="btn btn-reset" aria-label="Reset progress">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <button className="btn btn-delete" aria-label="Delete account">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}