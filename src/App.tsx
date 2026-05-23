import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchFilterBar from './components/SearchFilterBar'
import StatsPanel from './components/StatsPanel'
import GlobalProgress from './components/GlobalProgress'
import AccountCard from './components/AccountCard'
import FolderCard from './components/FolderCard'

// Sample data - in a real app, this would come from an API or localStorage
const sampleAccounts = [
  {
    id: '1',
    name: 'Main Account',
    pixels: 1500,
    targetPixels: 2000,
    lastIP: '192.168.1.100',
    lastIPDate: '2026-05-23',
    note: 'Primary account for daily use',
    completed: false,
    accentColor: '#4299e1',
  },
  {
    id: '2',
    name: 'Backup Account',
    pixels: 800,
    targetPixels: 1000,
    lastIP: '192.168.1.101',
    lastIPDate: '2026-05-22',
    note: 'Backup for emergencies',
    completed: false,
    accentColor: '#48bb78',
  },
  {
    id: '3',
    name: 'Test Account',
    pixels: 2000,
    targetPixels: 2000,
    lastIP: '192.168.1.102',
    lastIPDate: '2026-05-21',
    note: 'Completed account',
    completed: true,
    accentColor: '#9f7aea',
  },
];

const sampleFolders = [
  {
    id: '1',
    name: 'Work Accounts',
    accounts: sampleAccounts.slice(0, 2),
    totalPixels: 2300,
    targetPixels: 3000,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [accounts, setAccounts] = useState(sampleAccounts);
  const [folders, setFolders] = useState(sampleFolders);
  const [viewMode, setViewMode] = useState<'cards' | 'dashboard'>('cards');

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'completed' && account.completed) ||
                         (filterStatus === 'active' && !account.completed);
    return matchesSearch && matchesFilter;
  });

  const totalPixels = accounts.reduce((sum, account) => sum + account.pixels, 0);
  const totalTarget = accounts.reduce((sum, account) => sum + account.targetPixels, 0);
  const completedAccounts = accounts.filter(account => account.completed).length;

  return (
    <div className="app-container">
      <Header 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <SearchFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      
      <StatsPanel 
        totalAccounts={accounts.length}
        completedAccounts={completedAccounts}
        totalPixels={totalPixels}
        totalTarget={totalTarget}
      />
      
      <GlobalProgress 
        totalPixels={totalPixels}
        totalTarget={totalTarget}
      />
      
      {viewMode === 'cards' ? (
        <main className={viewMode === 'dashboard' ? 'ip-dashboard-view' : ''}>
          {filteredAccounts.map(account => (
            <AccountCard 
              key={account.id} 
              account={account} 
              darkMode={darkMode}
            />
          ))}
          {folders.map(folder => (
            <FolderCard 
              key={folder.id} 
              folder={folder} 
              darkMode={darkMode}
            />
          ))}
        </main>
      ) : (
        <div className="ip-dashboard-view">
          <div className="ip-dashboard-view-header">
            <h2>IP Dashboard</h2>
            <p>Track last IP addresses for all accounts</p>
          </div>
          {filteredAccounts.map(account => (
            <div key={account.id} className="ip-dash-card">
              <div className="ip-dash-card-header">
                <div>
                  <div className="ip-dash-card-name">{account.name}</div>
                  <div className="ip-dash-card-lastip">{account.lastIP}</div>
                </div>
                <div className="ip-dash-card-nodate">
                  {account.lastIPDate ? `Last: ${account.lastIPDate}` : 'No date recorded'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App