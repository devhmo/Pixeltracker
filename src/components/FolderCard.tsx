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

interface Folder {
  id: string;
  name: string;
  accounts: Account[];
  totalPixels: number;
  targetPixels: number;
}

interface FolderCardProps {
  folder: Folder;
  darkMode: boolean;
}

export default function FolderCard({ folder, darkMode }: FolderCardProps) {
  const progressPercentage = Math.min((folder.totalPixels / folder.targetPixels) * 100, 100);
  const nextUpAccount = folder.accounts.find(account => !account.completed);
  
  return (
    <div className="card folder-card">
      <div className="card-header">
        <div className="card-header-title">
          <h3>{folder.name}</h3>
        </div>
        <div className="card-header-actions">
          <button className="header-btn" aria-label="Folder options">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="folder-summary">
        {folder.accounts.length} accounts • {folder.totalPixels.toLocaleString()} / {folder.targetPixels.toLocaleString()} pixels
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {nextUpAccount && (
        <div className="next-up-container">
          <div className="next-up-title">Next Up</div>
          <div className="next-up-card">
            <div className="card-header">
              <div className="card-header-title">
                <h3>{nextUpAccount.name}</h3>
              </div>
            </div>
            <div className="pixels-display">
              {nextUpAccount.pixels.toLocaleString()} / {nextUpAccount.targetPixels.toLocaleString()} pixels
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${Math.min((nextUpAccount.pixels / nextUpAccount.targetPixels) * 100, 100)}%`,
                  backgroundColor: nextUpAccount.accentColor
                }}
              ></div>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <strong>Progress</strong>
                <span>{Math.round((nextUpAccount.pixels / nextUpAccount.targetPixels) * 100)}%</span>
              </div>
              <div className="info-item">
                <strong>Remaining</strong>
                <span>{(nextUpAccount.targetPixels - nextUpAccount.pixels).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="card-footer">
        <div className="footer-right">
          <button className="btn btn-edit" aria-label="Edit folder">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button className="btn btn-delete" aria-label="Delete folder">
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